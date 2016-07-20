import {Logs} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

export default function () {
  Meteor.methods({
    // example {"warning", "deny", "route", "file.edit" }
    // levels: ["info", "warning", "error"];
    'log.insert'(level, result, object, name, userId, message) {
      check(level, String);
      check(result, String);
      check(object, String);
      check(name, String);
      check(userId, Match.Maybe(String));
      check(message, Match.Maybe(String));

      // if method is called from client use user context, otherwhise use the parameter
      var user_id = this.userId || userId;
      var date_time = new Date();
      var log = {
        message: message || (level + ": " + result + " " + object + " " + name + " for user " + user_id),
        level: level,
        object: object,
        object: object,
        name: name,
        user_id: user_id,
        date_time: date_time,
      }

      // insert and output log entry
      console.log(log.message);
      if(Meteor.settings.private.log_user_actions && (Meteor.settings.private.log_levels.indexOf(log.level) > -1)){
        Logs.insert(log);
      }
    }
  });
}
