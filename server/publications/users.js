import {Users} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('user.list', function (usersId) {
    return Users.find(usersId);
  });
}
