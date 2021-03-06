import {Files} from '/lib/collections';
import * as notification from 'notie';

export default {
  upload({Meteor}, file, callback) {
    if (file) {
        var uploadInstance = Files.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic',
          meta: {
            usage: file.usage || "",
            albumId: file.albumId || ""
          }
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

            // make sure cover is unique by running updated method
            if(file.usage && file.usage === 'cover'){
              Meteor.call('file.update', fileObj, (err, res) => {
                  if (err) {
                    notification.alert(3, err.reason, 2.5);
                  }
              })
            }

            if(callback){
              callback(fileObj)
            }
          }
        });

        uploadInstance.start();
      }
  },
  update({Meteor}, file) {
    Meteor.call('file.update', file, (err, res) => {
        if (err) {
          notification.alert(3, err.reason, 2.5);
        } else {
          notification.alert(1, 'File updated.', 2.5);
        }
    })
  },
  remove({Meteor, FlowRouter}, file) {
    Meteor.call('file.remove', file, (err, res) => {
        if (err) {
          notification.alert(3, err.reason, 2.5);
        } else {
          FlowRouter.go('/files/')
        }
    })
  },
  goTo({Meteor, FlowRouter}, action, file) {
    Meteor.call('file.getIdOf', action, file, (err, res) => {
        if (err) {
          notification.alert(3, err.reason, 2.5);
        } else {
          if(FlowRouter.getRouteName() === "file.edit"){
            FlowRouter.go('/files/' + res + "/edit")
          }else{
            FlowRouter.go('/files/' + res)
          }
        }
    })
  },
}
