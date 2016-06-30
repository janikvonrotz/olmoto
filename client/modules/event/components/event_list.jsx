import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  insert() {
    this.props.insert({
      title: 'untitled',
      date: new Date(),
      start: new Date(),
      end: new Date(),
      category: '',
      files: [],
      participants: [],
    })
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
        <FloatingActionButton
          onTouchTap={this.insert.bind(this)}
        >
          <ContentAdd />
        </FloatingActionButton>
        <ul>{this.renderEvents()}</ul>
      </div>
    );
  }
}

export default EventList;
