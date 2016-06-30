import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import EventView from '../components/event_view.jsx';

export const composer = ({context, eventId}, onData) => {
  const {Meteor, Collections} = context();
  console.log(eventId)
  if (Meteor.subscribe('event.item', eventId).ready()) {
      const event = Collections.Events.findOne();
      onData(null, {event});    
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EventView);
