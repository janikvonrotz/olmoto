import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './containers/main_layout';
import Home from './containers/home';
import NotFound from './containers/not_found';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: <Home />
      });
    }
  });

  FlowRouter.notFound = {
    action() {
      mount(MainLayoutCtx, {
        content: <NotFound />
      });
    }
};
}
