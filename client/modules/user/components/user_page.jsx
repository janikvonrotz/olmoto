import React from 'react';
import UserList from '../containers/user_list';
import {TextField, FloatingActionButton, Paper, Divider, Checkbox, RaisedButton} from 'material-ui';
import {ContentAdd} from 'material-ui/svg-icons';

const styles = {
  textfield: {
    marginLeft: 20,
  },
  checkbox: {
  },
};

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      showInsertForm: false
    };
  }

  updateFilterText(event) {
    this.setState({
      filterText: event.target.value,
    })
  }

  toggleInsertForm() {

  }

  insert() {
    var user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
      profile:{
       firstname: this.refs.firstname.getValue(),
       lastname: this.refs.lastname.getValue(),
     },
     initpass: this.refs.password.getValue(),
     admin: this.refs.admin.isChecked(),
    }
    this.props.insert(user)
  }

  render() {
    return (
      <div>
        <TextField
          id="search"
          value={this.state.value}
          floatingLabelText="Search"
          onChange={this.updateFilterText.bind(this)}
        />
        <FloatingActionButton
          onTouchTap={this.toggleInsertForm.bind(this)}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Paper zDepth={2}>
          <TextField ref="firstname" hintText="First name" style={styles.textfield} type="text" underlineShow={false} />
          <Divider />
          <TextField ref="lastname" hintText="Last name" style={styles.textfield} type="text" underlineShow={false} />
          <Divider />
          <TextField ref="email" hintText="Email address" style={styles.textfield} type="email" underlineShow={false} />
          <Divider />
          <TextField ref="password" hintText="Password" style={styles.textfield} type="password" underlineShow={false} />
          <Divider />
          <Checkbox
             label="Admin"
             ref="admin"
             style={styles.checkbox}
           />
           <Divider />
           <RaisedButton
             label="Insert"
             onTouchTap={this.insert.bind(this)}
             primary={true}
           />
        </Paper>
        <UserList filterText={this.state.filterText} />
      </div>
    );
  }
}

export default UserPage;
