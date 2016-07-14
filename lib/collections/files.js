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

    var self = this;

    // create url from dropbox
    function makeUrl(stat, fileRef, version, triesUrl) {
      if (triesUrl == null) {
        triesUrl = 0;
      }
      client.makeUrl(stat.path, {
        long: true,
        downloadHack: true
      }, (error, xml) => {
        // store downloadable link in file's meta object
        bound(() => {
          if (error) {
            if (triesUrl < 10) {
              Meteor.setTimeout(() => {
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
            }, upd, (error) => {
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
              Meteor.setTimeout(() => {
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
    function writeToDB(fileRef, version, data, triesSend) {
      // dropBox already uses random URLs
      // no need to use random file names
      if (triesSend == null) {
        triesSend = 0;
      }
      client.writeFile(version + "/" + fileRef._id + "-" + version + "." + fileRef.extension, data, (error, stat) => {
        bound(() => {
          if (error) {
            if (triesSend < 10) {
              Meteor.setTimeout(() => {
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
    function readFile(fileRef, vRef, version, triesRead) {
      if (triesRead == null) {
        triesRead = 0;
      }
      fs.readFile(vRef.path, (error, data) => {
        bound(() => {
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

    // send every file version to remote storage
    function sendToStorage(fileRef) {
      _.each(fileRef.versions, (vRef, version) => {
        readFile(fileRef, vRef, version);
      });
    };

    // create a thumbnail of the uploaded picture
    function createThumbnail(filRef){
      // create thumbnail path
      var thumbPath = fileRef._storagePath + "/" + fileRef._id + "-thumb." + fileRef.extension

      // write thumbnail
      gm(fileRef.path)
      .resize(200, 200, '!')
      .write(thumbPath , (error, file) => {
        bound(() => {
          if (error) {
            console.log(error)
          } else {

            // add thumbnail version
            fileRef.versions.thumb = {
              path: thumbPath,
              size: fileRef.size,
              type: fileRef.type,
              extension: fileRef.extension,
            };

            // update collection
            self.collection.update({
              _id: fileRef._id
            }, {$set: {
              versions: fileRef.versions,
              uploadedAt: new Date()
            }}, (error) => {
              bound(() => {
                if (error) {
                  console.error(error);
                } else {
                  // initialize upload
                  sendToStorage(fileRef);
                }
              });
            });
          }
        });
      });
    }

    createThumbnail(fileRef);
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

if (Meteor.isServer) {
  // intercept File's collection remove method
  // to remove file from DropBox
  var _origRemove = Files.remove;

  Files.remove = (selector) => {
    var cursor = Files.collection.find(selector);
    cursor.forEach((fileRef) => {
      _.each(fileRef.versions, (vRef) => {
        var ref;
        if (vRef != null ? (ref = vRef.meta) != null ? ref.pipePath : void 0 : void 0) {
          client.remove(vRef.meta.pipePath, (error) => {
            bound(() => {
              if (error) {
                console.error(error);
              }
            });
          });
        }
      });
    });
    // call original method
    _origRemove.call(Files, selector);
  };
}

export default Files;
