import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import FilePage from './containers/file_page';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/files', {
    name: 'file.page',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<FilePage />)
      });
    }
  });
}
