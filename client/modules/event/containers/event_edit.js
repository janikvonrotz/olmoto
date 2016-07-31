import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import EventEdit from '../components/event_edit.jsx';

export const composer = ({context, eventId}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('event.item', eventId).ready() && Meteor.subscribe('file.cover', eventId).ready()) {
      const event = Collections.Events.findOne();
      var cover = Collections.Files.collection.findOne();
      if(cover){
        cover = Collections.Files.link(cover, 'preview');
      }
      onData(null, {event, cover});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  update: actions.events.update,
  remove: actions.events.remove,
  upload: actions.files.upload,
  setLocalState: actions.core.setLocalState,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EventEdit);
