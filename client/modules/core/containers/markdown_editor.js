import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import MarkdownEditor from '../components/markdown_editor.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  upload: actions.files.upload,
  setLocalState: actions.core.setLocalState,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MarkdownEditor);
