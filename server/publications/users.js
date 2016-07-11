import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

export default function () {
  Meteor.publish('user.list', function (filterText) {
    check(filterText, Match.Optional(String))
    if (filterText === '' || !filterText) {
        return Meteor.users.find({});
    } else {
        return Meteor.users.find({$or: [
            {_id: {$regex: filterText}},
            {"profile.lastname": {$regex: filterText}},
            {"profile.firstname": {$regex: filterText}},
        ]})
    }
  });
}
