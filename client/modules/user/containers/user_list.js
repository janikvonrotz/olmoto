import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import UserList from '../components/user_list.jsx';

export const composer = ({context, filterText}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('user.list', filterText).ready()) {
      var users = Meteor.users.find({}, {sort: {"profile.lastname": -1}}).fetch();
      onData(null, {users});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  remove: actions.users.remove,
  setLocalState: actions.core.setLocalState,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserList);
