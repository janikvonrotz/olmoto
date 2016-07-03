import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import FilePage from './containers/file_page';
import FileView from './containers/file_view';
import FileEdit from './containers/file_edit';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/files', {
    name: 'file.page',
    action() {
      mount(MainLayoutCtx, {
        content: <FilePage />
      });
    }
  });

  FlowRouter.route('/files/:fileId', {
    name: 'file.view',
    action({fileId}) {
      mount(MainLayoutCtx, {
        content: <FileView fileId={fileId} />
      });
    }
  });

  FlowRouter.route('/files/:fileId/edit', {
    name: 'file.edit',
    action({fileId}) {
      mount(MainLayoutCtx, {
        content: <FileEdit fileId={fileId} />
      });
    }
  });
}
