import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class EventView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const event = this.props.event
    console.log(event)
    if (!event) {
        return <div></div>
    }
    return (
      <div>
        <Card>
          <CardMedia
            overlay={<CardTitle title={event.title} />}
          >
            <img src="http://lorempixel.com/600/337/nature/" />
          </CardMedia>
          <CardTitle
            title={event.title}
          />
          <CardText
            actAsExpander={true}
            showExpandableButton={true}
          >
            {event.description}
          </CardText>
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
