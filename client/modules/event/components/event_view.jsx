import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import moment from 'moment';

class EventView extends React.Component {
  constructor(props) {
    super(props);
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
          <CardActions>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default EventView;
