import React from 'react';
import {List, ListItem, Avatar, Divider, IconMenu, MenuItem, IconButton} from 'material-ui';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {MoreVertIcon, FileFolder} from 'material-ui/svg-icons';
import {cannot_access} from '/lib/access_control';

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

  componentDidMount(){
    if(cannot_access('user.list')){
      FlowRouter.go('/')
    }
  }

  render() {
    const {users} = this.props;
    if(!users){return <div></div>}
    return (
      <div>
        <List>
          {(() => {
            return users.map((user) => {
              return (
                <ListItem key={user._id}
                  leftAvatar={<Avatar icon={<FileFolder />} />}
                  primaryText={user.profile.firstname + " " + user.profile.lastname}
                  secondaryText={<p>{user.emails[0].address}</p>}
                  secondaryTextLines={1}
                />
              );
            })
          })()}
        </List>
      </div>
    );
  }
}

export default UserList;
