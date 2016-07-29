
export default () => {
  process.env.MAIL_URL = Meteor.settings.private.mail_url;
};
