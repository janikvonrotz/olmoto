import {Events} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('event.list', function () {
    return Events.find();
  });

  Meteor.publish('event.edit', function (eventId) {
    return Events.find(eventId);
  });
}
