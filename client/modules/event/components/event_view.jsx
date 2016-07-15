import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, FloatingActionButton, FlatButton, CardText} from 'material-ui';
import {HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';
import keydown from 'react-keydown';
import moment from 'moment';

class EventView extends React.Component {
  constructor(props) {
    super(props);
  }

  @keydown( 'right' )
  goToNext(){
    this.props.goTo("next", this.props.event);
  }

  @keydown( 'left' )
  goToPrevious(){
    this.props.goTo("previous", this.props.event);
  }

  render() {
    const event = this.props.event
    if (!event) {
        return <div></div>
    }
    return (
      <div>
        <Card>
          <CardMedia
            overlay={<CardTitle subtitle={moment(event.date).format('D MMMM') + ', ' + 
              moment(event.start).format('hh:mm') + ' - ' + 
              moment(event.end).format('hh:mm')} />}
          >
            <img src="http://lorempixel.com/600/337/nature/" />
          </CardMedia>
          <CardActions>
            <FlatButton label="Participate" />
          </CardActions>
          <CardTitle
            title={event.title}
          />
          <CardText>
            {event.description}
          </CardText>
          <CardTitle
            subtitle="Participants"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText
            expandable={true}
          >
            {event.participants}
          </CardText>
          <FloatingActionButton onTouchTap={this.goToPrevious.bind(this)}>
            <HardwareKeyboardArrowLeft />
          </FloatingActionButton>

          <FloatingActionButton onTouchTap={this.goToNext.bind(this)}>
           <HardwareKeyboardArrowRight />
          </FloatingActionButton>
        </Card>
      </div>
    );
  }
}

export default EventView;
