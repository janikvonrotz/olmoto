import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import EventList from '../components/event_list.jsx';

export const composer = ({context, filterText}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('event.list', filterText).ready()) {
      var events = Collections.Events.find().fetch();
      onData(null, {events});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  insert: actions.events.insert,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EventList);
