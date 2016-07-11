import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import UserPage from './containers/user_page';
import Login from './containers/login';

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

  FlowRouter.route('/login/:email/:password', {
    name: 'user.login',
    action({email, password}) {
      mount(MainLayoutCtx, {
        content: <Login email={email} password={password} />
      });
    }
  });

  FlowRouter.route('/logout', {
    name: 'user.logout',
    action() {
      Meteor.logout();
      FlowRouter.go('home')
    }
  });
}
