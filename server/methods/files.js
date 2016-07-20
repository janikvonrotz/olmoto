import {Files} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {is_allowed} from '/lib/access_control';

export default function () {
  Meteor.methods({
    'file.update'(file) {
        check(file, Object)
        if(!is_allowed('file.update', this.userId)){
          throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
        }
        var fileId = file._id;
        delete file._id;
        Files.collection.update(fileId, {$set: file})
    },
    'file.remove'(file) {
        check(file, Object)
        if(!is_allowed('file.remove', this.userId)){
          throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
        }
        Files.remove(file._id)
    },
    'file.getIdOf'(action, file) {
        check(action, String)
        check(file, Object)

        if(!is_allowed('file.getIdOf', this.userId)){
          throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
        }

        function getItem (type) {
          var actions = {
            'next': () => {
              const result = Files.collection.find({uploadedAt: {$lt: file.uploadedAt}}, {sort: {uploadedAt: -1}, limit: 1}).fetch()[0]
              // if at the end of list return first
              if(!result){
                // get first item
                return Files.collection.find({}, {sort: {uploadedAt: -1}}).fetch()[0];
              }
              return result
            },
            'previous': () => {
              const result = Files.collection.find({uploadedAt: {$gt: file.uploadedAt}}, {sort: {uploadedAt: 1}, limit: 1}).fetch()[0]
              // if at the start of list return localhost
              if(!result){
                // get first item
                return Files.collection.find({}, {sort: {uploadedAt: 1}}).fetch()[0];
              }
              return result
            },
          };
          return actions[type]();
        }

        // get item
        return getItem(action)._id;
    },
  });
}
