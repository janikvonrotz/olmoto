export default {
  update({Meteor}, event) {
    Meteor.call('event.update', event, (err, res) => {
        if (err) {
            console.log(err.message)
        }
    })
  },
  insert({Meteor, FlowRouter}, event) {
    Meteor.call('event.insert', event, (err, res) => {
        if (err) {
            console.log(err.message)
        } else {
            FlowRouter.go('/events/' + res + '/edit')
        }
    })
  },
  remove({Meteor, FlowRouter}, event) {
    Meteor.call('event.remove', event, (err, res) => {
        if (err) {
            console.log(err.message)
        } else {
            FlowRouter.go('/events/')
        }
    })
  },  
}
