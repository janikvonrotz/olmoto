import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import EventList from './containers/event_list';
import EventEdit from './containers/event_edit';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/events', {
    name: 'event.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<EventList />)
      });
    }
  });

  FlowRouter.route('/events/:eventId', {
    name: 'event.edit',
    action({eventId}) {
      mount(MainLayoutCtx, {
        content: () => (<EventEdit eventId={eventId} />)
      });
    }
  });
}
