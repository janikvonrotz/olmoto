import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Layout = ({content = () => null }) => (
  <MuiThemeProvider>
    <div>
      {content()}
    </div>
  </MuiThemeProvider>
);

export default Layout;
