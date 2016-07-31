import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Home from '../home.jsx';

storiesOf('core.Home', module)
  .add('default view', () => {
    return (
      <Home />
    );
  })
