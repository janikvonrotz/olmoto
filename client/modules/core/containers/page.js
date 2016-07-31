import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Page from '../components/page.jsx';

export const composer = ({context, title}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('page.item', title).ready()) {
    const page = Collections.Pages.findOne();
    onData(null, {page})
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  update: actions.pages.update,
  setLocalState: actions.core.setLocalState,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Page);
