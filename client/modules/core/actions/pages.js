import * as notification from 'notie';

export default {
  update({Meteor}, page) {
    Meteor.call('page.update', page, (err, res) => {
      if (err) {
        notification.alert(3, err.reason, 2.5);
      }
    })
  },
  insert({Meteor, FlowRouter}, page) {
    Meteor.call('page.insert', page, (err, res) => {
      if (err) {
        notification.alert(3, err.reason, 2.5);
      }
    })
  },
  remove({Meteor, FlowRouter}, page) {
    Meteor.call('page.remove', page, (err, res) => {
      if (err) {
        notification.alert(3, err.reason, 2.5);
      }
    })
  },
}
