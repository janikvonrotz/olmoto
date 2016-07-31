import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/containers/main_layout';
import EventPage from './containers/event_page';
import EventEdit from './containers/event_edit';
import EventView from './containers/event_view';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/events', {
    name: 'event.list',
    action() {
      mount(MainLayoutCtx, {
        content: <EventPage />
      });
    }
  });

  FlowRouter.route('/events/:eventId/edit', {
    name: 'event.edit',
    action({eventId}) {
      mount(MainLayoutCtx, {
        content: <EventEdit eventId={eventId} />
      });
    }
  });

  FlowRouter.route('/events/:eventId', {
    name: 'event.view',
    action({eventId}) {
      mount(MainLayoutCtx, {
        content: <EventView eventId={eventId} />
      });
    }
  });
}
