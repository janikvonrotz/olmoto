import React from 'react';
import {TextField, RaisedButton, DatePicker, TimePicker, SelectField, MenuItem} from 'material-ui';
import {Card, CardTitle, CardText} from 'material-ui/Card';

class EventEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {category: props.event.category};
  }

  updateField(name, event, value) {
    this.props.event[name] = value;
    console.log(this.props.event)
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

  remove() {
    this.props.remove(this.props.event);
  }

  render() {
    const event = this.props.event
    if (!event) {
        return <div></div>
    }
    console.log(event)
    return (
      <div>
        <Card>
            <CardTitle
                title={event.title}
            />
            <CardText>
                <TextField
                    defaultValue={event.title}
                    floatingLabelText="Title"
                    onChange={this.updateField.bind(this, 'title')}
                />
                <DatePicker
                    defaultDate={event.date}
                    floatingLabelText="Date"
                    onChange={this.updateField.bind(this, 'date')}
                />
                <TimePicker
                    hintText="Start"
                    format="24hr"
                    defaultTime={event.start}
                    floatingLabelText="Start"
                    onChange={this.updateField.bind(this, 'start')}
                />
                <TimePicker
                    hintText="End"
                    format="24hr"
                    defaultTime={event.end}
                    floatingLabelText="End"
                    onChange={this.updateField.bind(this, 'end')}
                />
                <SelectField
                  value={this.state.category}
                  onChange={this.updateSelectField.bind(this, 'category')}
                  floatingLabelText="Category"
                >
                    <MenuItem value={'food'} primaryText="Food" />
                    <MenuItem value={'sport'} primaryText="Sport" />
                    <MenuItem value={'party'} primaryText="Party" />
                    <MenuItem value={'chill'} primaryText="Chill" />
                    <MenuItem value={'tourie'} primaryText="Tourie" />
                </SelectField>
                <TextField
                    defaultValue={event.description}
                    floatingLabelText="Description"
                    multiLine={true}
                    fullWidth={true}
                    onChange={this.updateField.bind(this, 'description')}
                />
                <RaisedButton
                    label="Save"
                    onTouchTap={this.update.bind(this)}
                    primary={true}
                />
                <RaisedButton
                    label="Remove"
                    onTouchTap={this.remove.bind(this)}
                    secondary={true}
                />
            </CardText>
        </Card>
      </div>
    );
  }
}

export default EventEdit;
