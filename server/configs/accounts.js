import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

export default () => {

  Accounts.onCreateUser((options, user) => {

    user.profile = options.profile ? options.profile : {};
    user.admin = options.admin;

    if(options.initpass){
      var email = user.emails[0].address;
      Email.send({
        to: email,
        from: Meteor.settings.private.admin_email,
        subject: `Invitation ${Meteor.settings.public.app_name} app`,
        html: `<p>Hi ${user.profile.firstname},
          you are receiving this mail because you have been invited to join the ${Meteor.settings.public.app_name} app.
          Logging in is quite easy. Simply use this url:

          <a href="${Meteor.settings.private.app_url}/login/${email}/${options.initpass}">${Meteor.settings.private.app_url}/login/${email}/${options.initpass}</a>

          Make sure you don't share this url with anybody!
          the ${Meteor.settings.public.app_name} team.
        </p>`,
      });
    }


    return user;
  });
}
