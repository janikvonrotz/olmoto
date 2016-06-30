import React from 'react';
import EventList from '../containers/event_list';
import {TextField} from 'material-ui';

class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {filterText: ''};
  }

  updateFilterText(event) {
    this.setState({
      filterText: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <TextField
          id="search"
          value={this.state.value}
          onChange={this.updateFilterText.bind(this)}
        />
        <EventList filterText={this.state.filterText} />
      </div>
    );
  }
}

export default EventPage;
