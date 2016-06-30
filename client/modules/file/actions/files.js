import {Files} from '/lib/collections';

export default {
  upload({Meteor}, file) {
    console.log(file);
    if (file) {
        var uploadInstance = Files.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);

        uploadInstance.on('start', function() {
          // template.currentFile.set(this);
        });

        uploadInstance.on('error', function(error) {
          console.error(error);
          // template.currentFile.set(false);
        });

        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error.reason);
          } else {
            alert('File "' + fileObj.name + '" successfully uploaded');
          }
          // template.currentFile.set(false);
        });

        uploadInstance.start();
      }
  },
}
