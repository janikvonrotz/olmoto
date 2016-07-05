import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import UserPage from './containers/user_page';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/users', {
    name: 'user.page',
    action() {
      mount(MainLayoutCtx, {
        content: <UserPage />
      });
    }
  });
}
