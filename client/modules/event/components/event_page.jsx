import React from 'react';
import EventList from '../containers/event_list';

class EventPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        
        <EventList />
      </div>
    );
  }
}

export default EventPage;
