import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import EventView from '../components/event_view.jsx';

export const composer = ({context, eventId}, onData) => {
  const {Meteor, Collections} = context();
  console.log(eventId)
  if (Meteor.subscribe('event.item', eventId).ready()) {
    const event = Collections.Events.findOne();
    if(event && Meteor.subscribe('user.participants', event.participants).ready()) {
      const participants = Collections.Participants.find({}, {sort: {"profile.firstname": -1}}).fetch()
      onData(null, {event, participants})
    }   
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  goTo: actions.events.goTo,
  update: actions.events.update,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EventView);
