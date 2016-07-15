import {Events} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';


export default function () {
  Meteor.publish('event.list', function (filterText) {
    check(filterText, Match.Optional(String))
    if (filterText === '' || !filterText) {
        return Events.find({});
    } else {
        return Events.find({$or: [
            {_id: {$regex: filterText}},
            {title: {$regex: filterText}},
            {category: {$regex: filterText}},
        ]})
    }
  });

  Meteor.publish('event.item', function (eventId) {
    return Events.find(eventId);
  });
}
