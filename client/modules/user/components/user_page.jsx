import React from 'react';
import UserList from '../containers/user_list';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        UserList
        <UserList />
      </div>
    );
  }
}

export default UserPage;
