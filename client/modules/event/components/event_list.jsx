import React from 'react';

class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderEvents() {
    return (
      this.props.events.map((event) => {
        return (
          <li key={event._id}>
            <a href={"/events/" + event._id}>{event.title}</a>
          </li>
        );
      })
    );
  }

  render() {
    console.log(this.props)
    return (
      <div>
        EventList
        <ul>{this.renderEvents()}</ul>
      </div>
    );
  }
}

export default EventList;
