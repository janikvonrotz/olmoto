import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {is_allowed} from '/lib/access_control';

export default function () {
  Meteor.methods({
    'user.insert'(user) {
      check(user, Object)
      if(!is_allowed('user.insert', this.userId)){
        throw new Meteor.Error("permission-denied", "Insufficient rights for this action.")
      }
      Accounts.createUser(user)
    },
    'user.remove'(user) {
        check(user, Object)
        if(!is_allowed('user.remove', this.userId)){
          throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
        }
        Meteor.users.remove(user._id)
    },
  });
}
