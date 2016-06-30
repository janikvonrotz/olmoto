import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import EventList from '../components/event_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('event.list').ready()) {
      var events = Collections.Events.find().fetch();
      onData(null, {events});    
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EventList);
