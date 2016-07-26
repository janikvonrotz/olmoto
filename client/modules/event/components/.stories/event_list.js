import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import EventList from '../event_list.jsx';

storiesOf('event.EventList', module)
  .add('default view', () => {
    return (
      <EventList />
    );
  })
