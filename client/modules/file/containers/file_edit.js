import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import FileEdit from '../components/file_edit.jsx';

export const composer = ({context, fileId}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('file.item', fileId).ready() && Meteor.subscribe('event.list').ready()) {
      const file = Collections.Files.collection.findOne();
      const events = Collections.Events.find().fetch();
      console.log(file)
      onData(null, {file, events});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  update: actions.files.update,
  remove: actions.files.remove,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FileEdit);