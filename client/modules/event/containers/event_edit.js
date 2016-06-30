import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import EventEdit from '../components/event_edit.jsx';

export const composer = ({context, eventId}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('event.item', eventId).ready()) {
      const event = Collections.Events.findOne();
      onData(null, {event});    
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  update: actions.events.update,
  remove: actions.events.remove,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EventEdit);
