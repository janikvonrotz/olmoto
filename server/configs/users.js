import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default () => {
  if (Meteor.users.find().count() === 0 ) {

    var users = [
      {
        email: 'admin@olmoto.com',
        verified: true,
        password: 'password',
        firstname: 'Admin',
        lastname: 'McAdmin',
        role: 'Admin'
      },
    ];

    users.map((user) => {

      var userId = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: {
          firstname: user.firstname,
          lastname: user.lastname
        }
      });

      // Roles.addUsersToRoles(userId, user.role);
      Meteor.users.update(userId, {$set: {'emails.0.verified': true}});
    });
  }
};
