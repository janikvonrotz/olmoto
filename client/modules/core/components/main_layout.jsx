import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar, Drawer, MenuItem} from 'material-ui';
import {classNames} from 'classnames';
import 'flexboxgrid/css/flexboxgrid.min.css'
import 'notie/dist/notie.css';
import Clear from 'material-ui/svg-icons/content/clear';
import {can_view_component} from '/lib/access_control';

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
      <MuiThemeProvider>
        <div className="row" style={styles.row}>
          <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3"><div className="box-row"></div></div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="box">
              <AppBar
                title="OLMOTO"
                onTouchTap={this.handleToggle.bind(this)}
              />
              <Drawer open={this.state.open}>
                <MenuItem primaryText="Close" onTouchTap={this.handleToggle.bind(this)} leftIcon={<Clear />} />
                <MenuItem linkButton={true} href="/events" primaryText="Events" />
                <MenuItem linkButton={true} href="/files" primaryText="Files" />
                { can_view_component('user.list') ? <MenuItem linkButton={true} href="/users" primaryText="Users" /> : null }
                { Meteor.user() ? <MenuItem linkButton={true} href="/logout" primaryText="Logout" /> : null}
              </Drawer>
              {this.props.content}
            </div>
          </div>
          <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3"><div className="box-row"></div></div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
