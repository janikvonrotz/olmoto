import * as notification from 'notie';

export default {
  update({Meteor}, event) {
    Meteor.call('event.update', event, (err, res) => {
      if (err) {
        notification.alert(3, err.reason, 2.5);
      } else {
        FlowRouter.go('/events/' + event._id)
      }
    })
  },
  insert({Meteor, FlowRouter}, event) {
    Meteor.call('event.insert', event, (err, res) => {
      if (err) {
        notification.alert(3, err.reason, 2.5);
      } else {
        FlowRouter.go('/events/' + res + '/edit')
      }
    })
  },
  remove({Meteor, FlowRouter}, event) {
    Meteor.call('event.remove', event, (err, res) => {
      if (err) {
        notification.alert(3, err.reason, 2.5);
      } else {
        FlowRouter.go('/events/')
      }
    })
  },
  goTo({Meteor, FlowRouter}, action, event) {
    Meteor.call('event.getIdOf', action, event, (err, res) => {
        if (err) {
          notification.alert(3, err.reason, 2.5);
        } else {
          FlowRouter.go('/events/' + res)
        }
    })
  },
}
