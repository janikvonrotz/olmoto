import {Files} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

export default function () {
  Meteor.publish('file.list', function (filterText) {
    check(filterText, Match.Optional(String));
    if (filterText === '' || !filterText) {
        return Files.collection.find({});
    } else {
        return Files.collection.find({$or: [
            {_id: {$regex: filterText}},
            {name: {$regex: filterText}},
        ]})
    }
  });

  Meteor.publish('file.item', function (fileId) {
    check(fileId, String);
    return Files.collection.find(fileId);
  });

  Meteor.publish('file.albumCover', function (albumId) {
    check(albumId, String);
    var result = Files.collection.find(
      {"albumId": albumId}
    );
    return result;
  });
}
