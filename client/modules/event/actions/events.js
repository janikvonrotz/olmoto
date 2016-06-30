export default {
  update({Meteor}, event) {
    Meteor.call('event.update', event, (err, res) => {
        if (err) {
            console.log(err.message)
        }
    })
  },
}
