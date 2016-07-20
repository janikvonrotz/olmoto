import React from 'react';
import {FloatingActionButton, List, ListItem, Subheader, Divider} from 'material-ui';
import {darkBlack} from 'material-ui/styles/colors';
import {ContentAdd, MapsRestaurant, PlacesFitnessCenter, MapsLocalBar, NotificationAirlineSeatFlat, PlacesBeachAccess} from 'material-ui/svg-icons';
import moment from 'moment';
import {can_view_component} from '/lib/access_control';

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
    return _.map(_.groupBy(this.props.events.map((event) => {
      event.dateOnly = event.date;
      event.dateOnly.setHours(0, 0, 0, 0);
      return event
      }), (g) => {
        return g.dateOnly
      }), (value, key) => {

        var events = value.map((event) => {
          return(
            <ListItem
              leftIcon={this.renderIcon(event.category)}
              key={event._id}
              primaryText={event.title}
              secondaryText={<p><span style={{color: darkBlack}}>{moment(event.date).format('hh:mm')}</span><span> - {event.description}</span></p>}
              href={"events/" + event._id}
              secondaryTextLines={2}
            />
          );
        })

        return (
          <div>
            <List>
              <Subheader>{moment(key).format('D MMMM')}</Subheader>
              {events}
              <Divider />
            </List>
          </div>
        );
      });
  }

  renderIcon(category){
    var icons = {
      'food': () => {
        return (
          <MapsRestaurant />
        );
      },
      'sport': () => {
        return (
          <PlacesFitnessCenter />
        );
      },
      'party': () => {
        return (
          <MapsLocalBar />
        );
      },
      'chill': () => {
        return (
          <NotificationAirlineSeatFlat />
        );
      },
      'tourie': () => {
        return (
          <PlacesBeachAccess />
        );
      },
    };
    return icons[category]();
  }

  render() {
    return (
      <div>
        {can_view_component('event.edit') ? <FloatingActionButton
          onTouchTap={this.insert.bind(this)}
        >
          <ContentAdd />
        </FloatingActionButton> : null }
        {this.renderEvents()}
      </div>
    );
  }
}

export default EventList;
