import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import UserList from '../components/user_list.jsx';

export const composer = ({context, filterText}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('user.list', filterText).ready()) {
    var users = []
    if (filterText === '' || !filterText) {
      users = Meteor.users.find({}).fetch();
    } else {
      users = Meteor.users.find({$or: [
        {_id: {$regex: filterText}},
        {"profile.lastname": {$regex: filterText}},
        {"profile.firstname": {$regex: filterText}},
        {"emails.address": {$regex: filterText}},
      ]}).fetch()
    }
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
