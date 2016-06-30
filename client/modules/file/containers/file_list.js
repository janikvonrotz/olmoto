import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import FileList from '../components/file_list.jsx';

export const composer = ({context, filterText}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('file.list', filterText).ready()) {
      const files = Collections.Files.collection.find().fetch().map((file) => {
        return {_id: file._id, img: Collections.Files.link(file), title: file.name, author: "Janik"}
      });
      onData(null, {files});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FileList);
