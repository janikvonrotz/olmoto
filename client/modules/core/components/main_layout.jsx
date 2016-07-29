import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { amber600, blueGrey700, cyan900, deepOrange900, indigo900, red900 } from 'material-ui/styles/colors';
import { AppBar, Card, Drawer, MenuItem } from 'material-ui';
import {classNames} from 'classnames';
import 'flexboxgrid/css/flexboxgrid.min.css'
import 'notie/dist/notie.css';
import Clear from 'material-ui/svg-icons/content/clear';
import { can_view_component } from '/lib/access_control';
import Helmet from 'react-helmet';

const muiTheme = getMuiTheme({
  appBar: {
    color: blueGrey700,
  },
  floatingActionButton: {
    color: amber600,
  },
  raisedButton: {
    primaryColor: amber600,
    secondaryColor: deepOrange900,
  }
});

const styles = {
  row: {
    margin: 0,
  },
};

class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {open: false};
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  };

  render(){
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="row" style={styles.row}>

          <Helmet
            title={Meteor.settings.public.app_name}
            meta={[{"name": "viewport", "content": "width=device-width, initial-scale=1"}]}
            link={[{"rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Roboto:400,300,500e", "type": "text/css"}]}
          />
          <div className="col-xs-12 col-sm-1 col-md-2"><div className="box-row"></div></div>
          <div className="col-xs-12 col-sm-10 col-md-8">
            <div className="box">
              <AppBar
                title={Meteor.settings.public.app_name}
                onTouchTap={this.handleToggle.bind(this)}
              />
              <Drawer open={this.state.open}>
                <MenuItem primaryText="Close" onTouchTap={this.handleToggle.bind(this)} leftIcon={<Clear />} />
                <MenuItem linkButton={true} href="/" primaryText="Home" />
                <MenuItem linkButton={true} href="/events" primaryText="Events" />
                <MenuItem linkButton={true} href="/files" primaryText="Files" />
                { can_view_component('user.list') ? <MenuItem linkButton={true} href="/users" primaryText="Users" /> : null }
                { Meteor.user() ? <MenuItem linkButton={true} href="/logout" primaryText="Logout" /> : null}
              </Drawer>
              {this.props.content}
            </div>
          </div>
          <div className="col-xs-12 col-sm-1 col-md-2"><div className="box-row"></div></div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
