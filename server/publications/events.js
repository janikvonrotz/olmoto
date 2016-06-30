import {Events} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';


export default function () {
  Meteor.publish('event.list', function (filterText) {
    check(filterText, Match.Optional(String))
    var options = {sort: {date: -1}}
    if (filterText === '') {
        return Events.find({}, options);        
    } else {
        return Events.find({$or: [
            {title: {$regex: filterText}},
            {category: {$regex: filterText}},
        ]}, options)
    }
  });

  Meteor.publish('event.item', function (eventId) {
    return Events.find(eventId);
  });
}
