import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import EventMap from '../event_map.jsx';

storiesOf('event.EventMap', module)
  .add('default view', () => {
    return (
      <EventMap />
    );
  })
