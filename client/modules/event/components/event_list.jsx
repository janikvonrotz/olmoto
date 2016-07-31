import React from 'react';
import { Badge, Divider, FloatingActionButton, GridList, GridTile, Subheader } from 'material-ui';
import { amber600, blueGrey50, lightGreen900, darkBlack, deepOrange500 } from 'material-ui/styles/colors';
import {MapsRestaurant, PlacesFitnessCenter, MapsLocalBar, NotificationAirlineSeatFlat, PlacesBeachAccess} from 'material-ui/svg-icons';
import moment from 'moment';
import EventMap from './event_map.jsx';

class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  addParticipant() {
    this.props.event.participants.push(Meteor.userId())
    this.props.update(this.props.event)
    return false
  }

  removeParticipant() {
    this.props.event.participants.splice(this.props.event.participants.indexOf(Meteor.userId()), 1)
    this.props.update(this.props.event)
    return false
  }

  createMarkers() {
    return this.props.events.map((event) => {
      if (!isNaN(+event.longitude) && !isNaN(+event.latitude)) {
        return {
          position: {
            lat: +event.latitude,
            lng: +event.longitude,
          },
          key: event._id,
          title: event.title,
        };
      }
    })
  }

  renderEvents() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        fontFamily: 'Roboto',
      },
      gridList: {
        width: '100%',
        overflowY: 'auto',
        marginBottom: 24,
      },
      participants: {
        position: 'absolute',
        top: 5,
        right: 5,
        color: '#fff',
      },
    };

    return _.map(_.groupBy(this.props.events.map(event => event), (g) => {
        return g.date
      }), (value, key) => {

        var events = value.map((event) => {
          let size = Math.floor((event.end - event.start)/(60*60*1000))

          return(
            <GridTile
              key={event._id}
              actionIcon={this.renderIcon(event.category)}
              actionPosition='left'
              style={{
                backgroundImage: `url(${event.cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              title={event.title}
              titleBackground="rgba(0,0,0,0.8)"
              subtitle={<p>{moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}</p>}
              cols={5 > size ? size : 4}
              rows={3 > size ? size : 2}
              containerElement={<a href={'/events/' + event._id}></a>}
            >
              <div style={styles.participants}>
                {(()=>{
                  if(event.participants.includes(Meteor.userId())){
                    return(
                      <FloatingActionButton
                        mini={true}
                        backgroundColor={lightGreen900}
                        onTouchTap={this.removeParticipant.bind(event)}
                      >
                        <div style={{color: '#fff'}}>{event.participants.length}</div>
                      </FloatingActionButton>
                    );
                  }else{
                    return(
                      <FloatingActionButton
                        mini={true}
                        backgroundColor={deepOrange500}
                        onTouchTap={this.addParticipant.bind(event)}
                      >
                        <div style={{color: '#fff'}}>{event.participants.length}</div>
                      </FloatingActionButton>
                    );
                  }
                })()}
              </div>
            </GridTile>
          );
        })

        return (
          <div style={styles.root}>
            <GridList
              cols={4}
              cellHeight={150}
              style={styles.gridList}
            >
              <Subheader
                style={{
                  backgroundColor: blueGrey50,
                }}
              >
                {moment(key).format('D MMMM')}
              </Subheader>
              {events}
            </GridList>
          </div>
        );
      });
  }

  renderIcon(category){
    const styles = {
      icons: {
        margin: 10,
        padding: 5,
        border: '1px solid #fff',
        backgroundColor: amber600,
      },
      color: '#fff',
    };
    var icons = {
      'food': () => {
        return (
          <MapsRestaurant style={styles.icons} color={styles.color} />
        );
      },
      'sport': () => {
        return (
          <PlacesFitnessCenter style={styles.icons} color={styles.color} />
        );
      },
      'party': () => {
        return (
          <MapsLocalBar style={styles.icons} color={styles.color} />
        );
      },
      'chill': () => {
        return (
          <NotificationAirlineSeatFlat style={styles.icons} color={styles.color} />
        );
      },
      'tourie': () => {
        return (
          <PlacesBeachAccess style={styles.icons} color={styles.color} />
        );
      },
    };
    return icons[category]();
  }

  render() {
    return (
      <div>
        {this.renderEvents()}
        <EventMap markers={this.createMarkers()} />
      </div>
    );
  }
}

export default EventList;
