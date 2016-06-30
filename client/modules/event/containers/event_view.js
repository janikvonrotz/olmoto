import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import EventView from '../components/event_view.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('event.item', eventId).ready()) {
      const event = Collections.Events.findOne();
      onData(null, {event});    
  }
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EventView);
