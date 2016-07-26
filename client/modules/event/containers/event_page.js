import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import EventPage from '../components/event_page.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  insert: actions.events.insert,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EventPage);
