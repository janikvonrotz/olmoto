import {Events} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'event.update'(event) {
        check(event, Object)
        var eventId = event._id;
        delete event._id;
        Events.update(eventId, {$set: event})
    },
    'event.insert'(event) {
        check(event, Object)
        return Events.insert(event)
    },
    'event.remove'(event) {
        check(event, Object)
        Events.remove(event._id)
    },
  });
}
