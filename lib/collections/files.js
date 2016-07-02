import {Mongo} from 'meteor/mongo';
import {FilesCollection} from 'meteor/ostrio:files';
import {gm} from 'meteor/cfs:graphicsmagick';

// const Files = new FilesCollection({
const Files = new Meteor.Files({
  storagePath: 'C:/uploads',
  collectionName: 'files',
  allowClientCode: false, // Disallow remove files from Client
  onAfterUpload: function(fileRef) {

    // create thumbnail path
    var thumbPath = fileRef._storagePath + "/" + fileRef._id + "-thumb." + fileRef.extension

    // create thumbnail
    gm(fileRef.path)
      .resize(200, 200, "!")
      .write(thumbPath , function (err) {
        if (!err) console.log('done');
      });

      // create thumb object
      var udp = {
        $set: {}
      };
      udp['$set']['versions.' +'thumb'] = {
        path: thumbPath,
        size: fileRef.size,
        type: fileRef.type,
        extension: fileRef.extension,
      };

      // update collection with subversion
      Files.update(fileRef._id, udp);
  },
});

export default Files;
