import {Events} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';


export default function () {
  Meteor.publish('event.list', function (filterText) {
    check(filterText, Match.Optional(String))
    if (!filterText) {
        return Events.find();        
    } else {
        return Events.find({$or: [
            {title: {$regex: filterText}},
            {category: {$regex: filterText}},
        ]})
    }
  });

  Meteor.publish('event.edit', function (eventId) {
    return Events.find(eventId);
  });
}
