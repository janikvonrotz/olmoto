import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import FileView from '../components/file_view.jsx';

export const composer = ({context, fileId}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('file.item', fileId).ready()) {
      var file = Collections.Files.collection.findOne();
      file.src = Collections.Files.link(file, 'preview');
      onData(null, {file});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  goTo: actions.files.goTo,
  setLocalState: actions.core.setLocalState,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FileView);
