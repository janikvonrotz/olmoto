import {Events} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {is_allowed} from '/lib/access_control';

export default function () {
  Meteor.methods({
    'event.update'(event) {
        check(event, Object)
        if(!is_allowed('event.update', this.userId)){
          throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
        }

        // merge date-time
        const {date, start, end} = event;
        if (event.start < event.end) {
          event.end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), end.getHours(), end.getMinutes(), 0);
        } else {
          event.end = new Date(date.getFullYear(), date.getMonth(), (date.getDate() + 1), end.getHours(), end.getMinutes(), 0);
        }
        event.start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), start.getHours(), start.getMinutes(), 0);
        event.date.setHours(0,0,0,0);

        var eventId = event._id;
        delete event._id;
        Events.update(eventId, {$set: event})
    },
    'event.insert'(event) {
        check(event, Object)
        if(!is_allowed('event.insert', this.userId)){
          throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
        }
        return Events.insert(event)
    },
    'event.remove'(event) {
        check(event, Object)
        if(!is_allowed('event.remove', this.userId)){
          throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
        }
        Events.remove(event._id)
    },
    'event.getIdOf'(action, event) {
        check(action, String)
        check(event, Object)
        if(!is_allowed('event.getIdOf', this.userId)){
          throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
        }
        function getItem (type) {
          var actions = {
            'next': () => {
              const result = Events.find({start: {$gt: event.start}}, {sort: {start: 1}, limit: 1}).fetch()[0]
              // if at the end ost list return first
              if(!result){
                // get first item
                return Events.find({}, {sort: {start: 1}}).fetch()[0];
              }
              return result
            },
            'previous': () => {
              const result = Events.find({start: {$lt: event.start}}, {sort: {start: -1}, limit: 1}).fetch()[0]
              // if at the end ost list return first
              if(!result){
                // get first item
                return Events.find({}, {sort: {start: -1}}).fetch()[0];
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
