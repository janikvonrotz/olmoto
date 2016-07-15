import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

export default () => {

  Accounts.onCreateUser((options, user) => {

    user.profile = options.profile ? options.profile : {};
    user.admin = options.admin;

    // send verification mail
    // Meteor.setTimeout(function() {
    //   Accounts.sendVerificationEmail(user._id);
    // }, 2 * 1000);
    if(options.initpass){
      var email = user.emails[0].address;
      Email.send({
        to: email,
        from: Meteor.settings.private.admin_email,
        subject: "Invitation",
        text: "You have been invited. Join:" +
         Meteor.settings.private.app_url + "/login/" + email + "/" + options.initpass,
      });
    }


    return user;
  });
}
