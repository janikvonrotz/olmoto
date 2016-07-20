import {Logs} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

export default function () {
  Meteor.methods({
    // example {"allow", "route", "file.edit" }
    'log.insert'(result, type, name, userId) {
      check(result, String);
      check(type, String);
      check(name, String);
      check(userId, Match.Maybe(String));

      // if method is called from client use user context, otherwhise use the parameter
      var user_id = this.userId || userId;
      var date_time = new Date();
      var log = {
        message: (date_time.toISOString() + ": " + result + " " + type + " " + name + " for user " + user_id),
        result: result,
        type: type,
        name: name,
        user_id: user_id,
        date_time: date_time,
      }

      // insert and output log entry
      console.log(log.message);
      if(Meteor.settings.private.log_user_actions){
        Logs.insert(log);
      }
    }
  });
}
