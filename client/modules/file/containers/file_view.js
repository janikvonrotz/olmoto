import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import FileView from '../components/file_view.jsx';

export const composer = ({context, fileId}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('file.item', fileId).ready()) {
      const file = Collections.Files.collection.findOne();
      console.log(file)
      onData(null, {file});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FileView);
