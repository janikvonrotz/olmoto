import React from 'react';
import { Avatar, Card, CardActions, CardHeader, CardMedia, CardText, CardTitle, Chip, FloatingActionButton, RaisedButton, List, ListItem } from 'material-ui';
import { HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight, ActionList } from 'material-ui/svg-icons';
import { blueGrey50, lightBlue900, lightGreen900 } from 'material-ui/styles/colors';
import keydown from 'react-keydown';
import moment from 'moment';
import {can_view_component} from '/lib/access_control';
import ImageLoader from '../../core/components/image_loader.jsx';
import EventMap from './event_map.jsx';

const styles = {
  chip: {
    margin: 4,
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    width: '100%',
  }
};

class EventView extends React.Component {
  constructor(props) {
    super(props);
  }

  addParticipant() {
    this.props.event.participants.push(Meteor.userId())
    this.props.update(this.props.event)
  }

  removeParticipant() {
    this.props.event.participants.splice(this.props.event.participants.indexOf(Meteor.userId()), 1)
    this.props.update(this.props.event)
  }

  @keydown( 'right' )
  goToNext(){
    this.props.goTo("next", this.props.event);
  }

  @keydown( 'left' )
  goToPrevious(){
    this.props.goTo("previous", this.props.event);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.event._id != nextProps.event._id){
      this.setState({
        fileStatus: 'loading'
      })
    }
  }

  createMarker() {
    return [{
      position: {
        lat: +this.props.event.latitude,
        lng: +this.props.event.longitude,
      },
      key: this.props.event._id,
      title: this.props.event.title,
    }];
  }

  render() {
    const {event, participants, cover} = this.props
    if (!event) {
        return <div></div>
    }

    return (
      <div>
        <Card style={{backgroundColor: blueGrey50}}>
          <CardText
            style={{position: 'relative', padding: 10}}
          >
            <div style={{width: '100%', textAlign: 'center', paddingBottom: 10}}>
              <FloatingActionButton onTouchTap={this.goToPrevious.bind(this)}>
                <HardwareKeyboardArrowLeft />
              </FloatingActionButton>

              <FloatingActionButton href="/events" style={{margin: '0 30px'}}>
                <ActionList />
              </FloatingActionButton>

              <FloatingActionButton onTouchTap={this.goToNext.bind(this)}>
               <HardwareKeyboardArrowRight />
              </FloatingActionButton>
            </div>
            <div style={{width: '100%', textAlign: 'center'}}>
              <h5 style={{marginTop: 0}} >
                {moment(event.date).format('D MMMM') + ', ' +
                moment(event.start).format('HH:mm') + ' - ' +
                moment(event.end).format('HH:mm')}
              </h5>
            </div>
            {can_view_component('event.edit') ? <RaisedButton
              label="Edit"
              href={event._id + "/edit"}
              primary={true}
              style={{position: 'absolute', top: 10, right: 10}}
            /> : null }
          </CardText>
          {(()=>{
            if(event.participants.includes(Meteor.userId())){
              return(
                <RaisedButton
                  backgroundColor={lightGreen900}
                  label="Nahh bro, not with me..."
                  labelColor='#fff'
                  onTouchTap={this.removeParticipant.bind(this)}
                  style={styles.button}
                />
              );
            }else{
              return(
                <RaisedButton
                  secondary={true}
                  label="Bin in der Platz !!!"
                  onTouchTap={this.addParticipant.bind(this)}
                  style={styles.button}
                />
              );
            }
          })()}

          <CardMedia
            style={{backgroundColor: '#fff'}}
          >
            <ImageLoader src={cover} />
          </CardMedia>
          <CardTitle
            title={event.title}
          />
          <CardText>
            {event.description ? <p>{event.description}<p> : null}
            {event.web ? <p><a href={event.web} >{event.web}</a></p> : null}
            {(()=>{
              if(0 < participants.length){
                return (
                  <div style={styles.chipWrapper} >
                    {(()=>{
                      return participants.map((participant) => {
                        return (
                          <Chip
                            key={participant._id}
                            style={styles.chip}
                          >
                            <Avatar
                              size={32}
                              backgroundColor={lightBlue900}
                            >
                              {participant.profile.firstname.substring(0,1) + participant.profile.lastname.substring(0,1)}
                            </Avatar>
                            {participant.profile.firstname}
                          </Chip>
                        )
                      })
                    })()}
                  </div>
                )
              }
            })()}
          </CardText>
        </Card>
        {(() => {
          if (0 < event.longitude && 0 < event.latitude) {
            return <EventMap markers={this.createMarker()}/>
          }
        })()}
      </div>
    );
  }
}

export default EventView;
