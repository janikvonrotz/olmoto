import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import EventPage from '../event_page.jsx';

storiesOf('event.EventPage', module)
  .add('default view', () => {
    return (
      <EventPage />
    );
  })
