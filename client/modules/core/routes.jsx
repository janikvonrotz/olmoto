import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './containers/main_layout';
import Home from './components/home.jsx';
import NotFound from './components/not_found.jsx';

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
