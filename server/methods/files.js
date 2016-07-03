import {Files} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

export default function () {
  Meteor.methods({
    'file.update'(file) {
        check(file, Object)
        var fileId = file._id;
        delete file._id;
        Files.collection.update(fileId, {$set: file})
    },
    'file.remove'(file) {
        check(file, Object)
        Files.remove(file._id)
    },
    'file.getIdOf'(action, file) {
        check(action, String)
        check(file, Object)

        // return next or previous item, optionally filter selection by eventId
        const result = Files.collection.find({uploadedAt: {$lt: file.uploadedAt}}, {sort: {uploadedAt: -1}, limit: 1}).fetch()[0]

        return result._id;
    },
  });
}
