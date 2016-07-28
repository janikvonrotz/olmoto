import React from 'react';
import { Divider, GridList, GridTile, Subheader } from 'material-ui';
import { darkBlack } from 'material-ui/styles/colors';
import {MapsRestaurant, PlacesFitnessCenter, MapsLocalBar, NotificationAirlineSeatFlat, PlacesBeachAccess} from 'material-ui/svg-icons';
import moment from 'moment';

class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  detailView() {
    FlowRouter.go('/events/' + this._id)
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
    };

    return _.map(_.groupBy(this.props.events.map(event => event), (g) => {
        return g.date
      }), (value, key) => {

        var events = value.map((event) => {
          let size = (event.end - event.start)/(60*60*1000)

          return(
            <GridTile
              key={event._id}
              onTouchTap={this.detailView.bind(event)}
              actionIcon={this.renderIcon(event.category)}
              title={event.title}
              titleBackground="rgba(0,0,0,0.8)"
              subtitle={<p>{moment(event.start).format('hh:mm')} - {moment(event.end).format('hh:mm')}</p>}
              cols={5 > size ? size : 4}
              rows={3 > size ? size : 2}
            >
              <img src={event.cover} />
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
              <Subheader>
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
      </div>
    );
  }
}

export default EventList;
