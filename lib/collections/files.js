import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {FilesCollection} from 'meteor/ostrio:files';
import {gm} from 'meteor/cfs:graphicsmagick';

// const Files = new FilesCollection({
const Files = new Meteor.Files({
  storagePath: Meteor.settings.public.storagePath,
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

      // update collection with thumbnail
      Files.update(fileRef._id, udp);

      // update with upload date
      Files.update(fileRef._id, {$set: {uploadedAt: new Date()}})
  },
});

export default Files;
