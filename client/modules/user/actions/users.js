import * as notification from 'notie';
import { Accounts } from 'meteor/accounts-base';

export default {
  login({Meteor, FlowRouter}, email, password) {
    Meteor.loginWithPassword(email, password, (err, res) => {
      if(err){
        notification.alert(3, err.message, 2.5);
      }else{
        notification.alert(1, 'You successfully logged in.', 2.5);
        FlowRouter.go('/events');
      }
    })
  },
  insert({Meteor, FlowRouter}, user){
    Meteor.call('user.insert', user, (err, res) => {
      if (err) {
        notification.alert(3, err.reason, 2.5)
      } else {
        notification.alert(1, 'User added, inivation email has been sent.', 2.5)
      }
    })
  },
  remove({Meteor, FlowRouter}, user){
    Meteor.call('user.remove', user, (err, res) => {
      if (err) {
        notification.alert(3, err.reason, 2.5)
      } else {
        notification.alert(1, 'User has been removed.', 2.5)
      }
    })
  }
}
