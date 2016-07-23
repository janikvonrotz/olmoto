import React from 'react';
import {List, ListItem, Avatar, Divider, IconMenu, MenuItem, IconButton, RaisedButton} from 'material-ui';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {MoreVertIcon, FileFolder} from 'material-ui/svg-icons';
import {cannot_access} from '/lib/access_control';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  remove(user){
    this.props.remove(user);
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
                  rightIconButton={            <RaisedButton
                                label="Remove"
                                onTouchTap={this.remove.bind(this, user)}
                                secondary={true}
                              />}
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
