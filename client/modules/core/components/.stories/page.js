import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Page from '../page.jsx';

storiesOf('core.Page', module)
  .add('default view', () => {
    return (
      <Page />
    );
  })
