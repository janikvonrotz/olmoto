import * as notification from 'notie';

export default {
  login({Meteor, FlowRouter}, email, password) {
    Meteor.loginWithPassword(email, password, (err, res) => {
      if(err){
        notification.alert(3, err.message, 2.5);
      }else{
        notification.alert(1, 'You successfully logged in.', 2.5);
        FlowRouter.go('/events');
      }
    });
  },
}
