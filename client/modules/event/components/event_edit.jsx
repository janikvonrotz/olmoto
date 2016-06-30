import React from 'react';
import {TextField, RaisedButton} from 'material-ui';

class EventEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  update() {
    var event = this.props.event;
    event.title = this.refs.title.getValue();
    this.props.update(event);
  }

  render() {
    const event = this.props.event
    if (!event) {
        return <div></div>
    }
    return (
      <div>
        EventEdit
        <h1>{event.title}</h1>
        <TextField 
            id="title"
            defaultValue={event.title}
            floatingLabelText="Title"
            ref="title"
        />
        <RaisedButton
            label="Save"
            onTouchTap={this.update.bind(this)}
        />
      </div>
    );
  }
}

export default EventEdit;
