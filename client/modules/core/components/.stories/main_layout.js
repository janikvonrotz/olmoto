import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import MainLayout from '../main_layout.jsx';

storiesOf('core.MainLayout', module)
  .add('default view', () => {
    return (
      <MainLayout />
    );
  })
