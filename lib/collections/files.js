import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {FilesCollection} from 'meteor/ostrio:files';
import {gm} from 'meteor/cfs:graphicsmagick';
import Dropbox from 'dropbox';
import fs from 'fs';
import Request from 'request'

if (Meteor.isServer) {

  const {dropbox_token, dropbox_key, dropbox_secret} = Meteor.settings.private
  var client = new Dropbox.Client({
    "token": dropbox_token,
    "key": dropbox_key,
    "secret": dropbox_secret
   });

   // Meteor env callback function
   var bound = Meteor.bindEnvironment(function(callback) {
      return callback();
    });
}
// const Files = new FilesCollection({
const Files = new Meteor.Files({
  storagePath: Meteor.settings.public.storage_path,
  collectionName: 'files',
  allowClientCode: false, // Disallow remove files from Client
  onAfterUpload: function(fileRef) {

    // create thumbnail path
    var thumbPath = fileRef._storagePath + "/" + fileRef._id + "-thumb." + fileRef.extension

    // create thumbnail
    gm(fileRef.path)
      .resize(200, 200, "!")
      .write(thumbPath , function (error) {
        if (error) console.log(error);
      });

    // add thumbnail version
    fileRef.versions.thumb = {
      path: thumbPath,
      size: fileRef.size,
      type: fileRef.type,
      extension: fileRef.extension,
    };

    // update collection with thumbnail
    Files.update(fileRef._id, {$set: {versions: fileRef.versions}});

    // update with upload date
    Files.update(fileRef._id, {$set: {uploadedAt: new Date()}});

    // upload original and thumbnail to dropbox
    var self = this;

    // var data = fs.readFile(fileRef.path);
    // var name = fileRef._id + "-" + fileRef.name
    // client.writeFile(name, data, () => {
    //     console.log('File written!');
    // });

    // create url from dropbox
    var makeUrl = function(stat, fileRef, version, triesUrl) {
      if (triesUrl == null) {
        triesUrl = 0;
      }
      client.makeUrl(stat.path, {
        long: true,
        downloadHack: true
      }, function(error, xml) {
        // store downloadable link in file's meta object
        bound(function() {
          if (error) {
            if (triesUrl < 10) {
              Meteor.setTimeout(function() {
                makeUrl(stat, fileRef, version, ++triesUrl);
              }, 2048);
            } else {
              console.error(error, {
                triesUrl: triesUrl
              });
            }
          } else if (xml) {
            var upd = {
              $set: {}
            };
            upd['$set']["versions." + version + ".meta.pipeFrom"] = xml.url;
            upd['$set']["versions." + version + ".meta.pipePath"] = stat.path;
            self.collection.update({
              _id: fileRef._id
            }, upd, function(error) {
              if (error) {
                console.error(error);
              } else {
                // unlink original files from FS
                // after successful upload to DropBox
                self.unlink(self.collection.findOne(fileRef._id), version);
              }
            });
          } else {
            if (triesUrl < 10) {
              Meteor.setTimeout(function() {
                makeUrl(stat, fileRef, version, ++triesUrl);
              }, 2048);
            } else {
              console.error("client.makeUrl doesn't returns xml", {
                triesUrl: triesUrl
              });
            }
          }
        });
      });
    };

    // write to dropbox
    var writeToDB = function(fileRef, version, data, triesSend) {
      // dropBox already uses random URLs
      // no need to use random file names
      if (triesSend == null) {
        triesSend = 0;
      }
      client.writeFile(fileRef._id + "-" + version + "." + fileRef.extension, data, function(error, stat) {
        bound(function() {
          if (error) {
            if (triesSend < 10) {
              Meteor.setTimeout(function() {
                writeToDB(fileRef, version, data, ++triesSend);
              }, 2048);
            } else {
              console.error(error, {
                triesSend: triesSend
              });
            }
          } else {
            // generate downloadable link
            makeUrl(stat, fileRef, version);
          }
        });
      });
    };

    // read files from local storeage
    var readFile = function(fileRef, vRef, version, triesRead) {
      if (triesRead == null) {
        triesRead = 0;
      }
      fs.readFile(vRef.path, function(error, data) {
        bound(function() {
          if (error) {
            if (triesRead < 10) {
              readFile(fileRef, vRef, version, ++triesRead);
            } else {
              console.error(error);
            }
          } else {
            // write to dropbox
            writeToDB(fileRef, version, data);
          }
        });
      });
    };

    // send every version to remote storage
    var sendToStorage = function(fileRef) {
      _.each(fileRef.versions, function(vRef, version) {
        readFile(fileRef, vRef, version);
      });
    };

    // initialize upload
    sendToStorage(fileRef);
  },

  // download file from dropbox
  interceptDownload: function(http, fileRef, version) {
    var path, ref, ref1, ref2;
    path = (ref = fileRef.versions) != null ? (ref1 = ref[version]) != null ? (ref2 = ref1.meta) != null ? ref2.pipeFrom : void 0 : void 0 : void 0;
    if (path) {
      // if file is moved to DropBox
      // we will pipe request to DropBox
      // so, original link will always stay secure
      Request({
        url: path,
        headers: _.pick(http.request.headers, 'range', 'accept-language', 'accept', 'cache-control', 'pragma', 'connection', 'upgrade-insecure-requests', 'user-agent')
      }).pipe(http.response);
      return true;
    } else {
      // While file is not yet uploaded to DropBox
      // We will serve file from FS
      return false;
    }
  }
});

export default Files;
