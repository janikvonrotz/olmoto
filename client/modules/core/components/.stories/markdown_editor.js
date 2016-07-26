import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import MarkdownEditor from '../markdown_editor.jsx';

storiesOf('core.MarkdownEditor', module)
  .add('default view', () => {
    return (
      <MarkdownEditor />
    );
  })
