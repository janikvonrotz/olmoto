import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import MainLayout from '../components/main_layout.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  console.log(LocalState.get('title'))
  const title = LocalState.get('title') ? LocalState.get('title').title : Meteor.settings.public.app_name
  onData(null, {title});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MainLayout);
