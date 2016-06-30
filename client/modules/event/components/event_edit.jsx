import React from 'react';
import {TextField, RaisedButton, DatePicker, TimePicker, SelectField, MenuItem} from 'material-ui';

class EventEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {category: props.event.category};
  }

  updateField(name, event, value) {
    this.props.event[name] = value;
  }

  updateSelectField(name, event, index, value){
    var state = {}
    state[name] = value
    this.setState(state)
    this.props.event[name] = value;
  }

  update() {
    this.props.update(this.props.event);
  }

  render() {
    const event = this.props.event
    if (!event) {
        return <div></div>
    }
    console.log(event)
    return (
      <div>
        EventEdit
        <h1>{event.title}</h1>
        <TextField 
            defaultValue={event.title}
            floatingLabelText="Title"
            onChange={this.updateField.bind(this, 'title')}
        />
        <DatePicker
            defaultDate={event.date}
            onChange={this.updateField.bind(this, 'date')}
        />
        <TimePicker
            hintText="Start"
            format="24hr"
            defaultTime={event.start}
            onChange={this.updateField.bind(this, 'start')}
        />
        <TimePicker
            hintText="End"
            format="24hr"
            defaultTime={event.end}
            onChange={this.updateField.bind(this, 'end')}
        />
        <SelectField value={this.state.category} onChange={this.updateSelectField.bind(this, 'category')}>
            <MenuItem value={'food'} primaryText="Food" />
            <MenuItem value={'sport'} primaryText="Sport" />
        </SelectField>
        <RaisedButton
            label="Save"
            onTouchTap={this.update.bind(this)}
        />
      </div>
    );
  }
}

export default EventEdit;
