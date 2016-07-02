import {Files} from '/lib/collections';
import * as notification from 'notie';

export default {
  upload({Meteor}, file) {
    if (file) {
        var uploadInstance = Files.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);

        uploadInstance.on('start', function() {
        });

        uploadInstance.on('error', function(error) {
        });

        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
            notification.alert(3, error.reason, 2.5);
          } else {
            notification.alert(1, 'Successfully uploaded.', 2.5);
          }
        });

        uploadInstance.start();
      }
  },
}
