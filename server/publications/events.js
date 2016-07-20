import {Events} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {is_allowed} from '/lib/access_control';

export default function () {
  Meteor.publish('event.list', function (filterText) {
    check(filterText, Match.Optional(String))
    if(is_allowed('event.list', this.userId)){
      if (filterText === '' || !filterText) {
        return Events.find({});
      } else {
        return Events.find({$or: [
          {_id: {$regex: filterText}},
          {title: {$regex: filterText}},
          {category: {$regex: filterText}},
          {description: {$regex: filterText}},
        ]})
      }
    }else{
      this.stop();
    }
  });

  Meteor.publish('event.item', function (eventId) {
    if(is_allowed('event.item', this.userId)){
      return Events.find(eventId);
    }else{
      this.stop();
    }
  });
}
