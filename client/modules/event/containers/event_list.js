import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';

import EventList from '../components/event_list.jsx';

export const composer = ({context, filterText}, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('file.covers').ready()) {
    var covers = Collections.Files.collection.find().fetch();
  }
  if (Meteor.subscribe('event.list', filterText).ready()) {
    var events = Collections.Events.find({}, {sort: {start: 1}}).fetch();
    var events = events.map((event) => {
      let cover = covers.find((cover) => {
        return cover.meta.albumId === event._id;
      })
      if (cover) {
        event.cover = Collections.Files.link(cover, 'preview')
      }
      return event;
    })
    onData(null, { events });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EventList);
