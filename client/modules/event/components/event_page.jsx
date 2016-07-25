import React from 'react';
import EventList from '../containers/event_list';
import {TextField, FloatingActionButton} from 'material-ui';
import {ContentAdd} from 'material-ui/svg-icons';

import {can_view_component} from '/lib/access_control';


class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {filterText: ''};
  }

  insert() {
    this.props.insert({
      title: 'untitled',
      date: new Date(),
      start: new Date(),
      end: new Date(),
      category: 'food',
      files: [],
      participants: [],
    })
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
          floatingLabelText="Search"
          onChange={this.updateFilterText.bind(this)}
        />
        {can_view_component('event.edit') ? <FloatingActionButton
          onTouchTap={this.insert.bind(this)}
        >
          <ContentAdd />
        </FloatingActionButton> : null }
        <EventList filterText={this.state.filterText} />
      </div>
    );
  }
}

export default EventPage;
