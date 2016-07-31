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
        html: `<h3>Hoi ${user.profile.firstname}</h3>
          <p>Du bist herzlich eingeladen die neue, super coole ${Meteor.settings.public.app_name} App zu nutzen! 
          Darauf findest du alle Informationen bezüglich Programm alljährlichen Treffens der ${Meteor.settings.public.app_name}-Elite 
          und kannst dich für alle Events anmelden, an denen du Teilnehmen möchtest.</p>
          <p>Die ${Meteor.settings.public.app_name} App dient auch gleich als Dropbox-Schnittstelle, wo alle ganz einfach ihre Bilder
          hochladen können.</p>
          <p>Mit dem folgenden link logst du dich automatisch ein:</p>

          <a href="${Meteor.settings.public.app_url}/login/${email}/${options.initpass}">${Meteor.settings.public.app_url}/login/${email}/${options.initpass}</a>
          
          <p>Also, check that shit out und falls noch fragen sind, einfach den Host fragen...
          </p>`,
      });
    }


    return user;
  });
}
