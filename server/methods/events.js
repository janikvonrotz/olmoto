import {Events} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'event.update'(event) {
        check(event, Object)
        var eventId = event._id;

        Events.update(eventId, {$set: event})

    }
  });
}
