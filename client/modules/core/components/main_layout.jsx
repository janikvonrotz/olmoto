import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

const Layout = ({content = () => null }) => (
  <MuiThemeProvider>
    <Grid>
        <Row>
            <Col xs={8} sm={3} md={2} lg={1} >
              {content()}
            </Col>
        </Row>
    </Grid>
  </MuiThemeProvider>
);

export default Layout;
