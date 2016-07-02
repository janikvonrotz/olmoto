import {Files} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

export default function () {
  Meteor.publish('file.list', function (filterText) {
    check(filterText, Match.Optional(String));
    var options = {}
    if (filterText === '') {
        return Files.collection.find({}, options);
    } else {
        return Files.collection.find({$or: [
            {name: {$regex: filterText}},
        ]}, options)
    }
  });

  Meteor.publish('file.item', function (fileId) {
    return Files.collection.find(fileId);
  });
}
