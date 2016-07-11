import React from 'react';
import {List, ListItem, Avatar, Divider, IconMenu, MenuItem, IconButton} from 'material-ui';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {MoreVertIcon, FileFolder} from 'material-ui/svg-icons';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);


const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Disable</MenuItem>
    <MenuItem>Copy Login Link</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderListItem(){
    return this.props.users.map((user) => {
      return (
        <ListItem key={user._id}
          leftAvatar={<Avatar icon={<FileFolder />} />}
          rightIconButton={rightIconMenu}
          primaryText={user.firstname + " " + user.lastname}
          secondaryText={<p>{user.firstname}</p>}
          secondaryTextLines={1}
        />
      );
    })
  }

  render() {
    const {users} = this.props;
    if(!users){return <div></div>}
    return (
      <div>
        <List>
        {this.renderListItem()}
        </List>
      </div>
    );
  }
}

export default UserList;
