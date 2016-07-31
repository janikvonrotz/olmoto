import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {is_allowed} from '/lib/access_control';

export default function () {
  Meteor.publish('user.current', function () {
    if (this.userId) {
      return Meteor.users.find(
        {_id: this.userId},
        {fields: {'profile': 1, 'admin': 1, 'emails': 1}}
      );
    } else {
      this.ready();
    }
  });

  Meteor.publish('user.list', function(filterText) {
    check(filterText, Match.Optional(String));
    if(is_allowed('user.list', this.userId)){
      if (filterText === '' || !filterText) {
        return Meteor.users.find({});
      } else {
        // Meteor.users must be filtered on the client!
        return Meteor.users.find({});
      }
    }else{
      this.stop();
    }
  });

  Meteor.publish('user.participants', function(participants) {
    check(participants, Match.Optional(Array))
    if(is_allowed('user.participants', this.userId)){
      var self = this;
      var handle = Meteor.users.find(
        {"_id": { "$in": participants }},
        { fields: { profile: 1 } },
      ).observeChanges({
        added: function (id, fields) {
          self.added('participants', id, fields);
        },
        changed: function (id, fields) {
          self.changed('participants', id, fields);
        },
        removed: function (id) {
          self.removed('participants', id);
        }
      });
      self.ready();
      self.onStop(function () {
        handle.stop();
      });
    }else{
      this.stop();
    }
  });
}
