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
    let date = new Date();
    date.setHours(0,0,0,0);
    let start = new Date();
    start.setHours(12,0,0,0);
    let end = new Date();
    end.setHours(13,0,0,0);

    this.props.insert({
      files: [],
      title: 'untitled',
      date: date,
      start: start,
      end: end,
      category: 'food',
      desciption: '',
      web: '',
      longitude: '',
      latitude: '',
      participants: [],
    })
  }

  updateFilterText(event) {
    this.setState({
      filterText: event.target.value,
    })
  }

  componentDidMount(){
    this.props.setLocalState({title: "Events"})
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
