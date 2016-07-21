import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import EventView from '../components/event_view.jsx';

export const composer = ({context, eventId}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('event.item', eventId).ready() && Meteor.subscribe('file.cover', eventId).ready()) {
    const event = Collections.Events.findOne();
    var cover = Collections.Files.collection.findOne();
    if(cover){
      cover = Collections.Files.link(cover);
    }
    if(event && Meteor.subscribe('user.participants', event.participants).ready()) {
      const participants = Collections.Participants.find({}, {sort: {"profile.firstname": -1}}).fetch()
      onData(null, {event, cover, participants})
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
