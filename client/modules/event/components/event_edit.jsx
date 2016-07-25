import React from 'react';
import {TextField, RaisedButton, DatePicker, TimePicker, SelectField, MenuItem, Card, CardTitle, CardText, CardMedia} from 'material-ui';
import {cannot_access} from '/lib/access_control';
import ImageLoader from '../../core/components/image_loader.jsx';

const styles = {
  button: {
    margin: 12,
  },
  fileInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class EventEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.event.category
    };
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

  remove() {
    this.props.remove(this.props.event);
  }

  upload(event){
    _.map(event.target.files, (file) => {
      file.albumId = this.props.event._id
      file.usage = "cover";
      this.props.upload(file);
    });
  }

  componentDidMount(){
    if(cannot_access('event.edit')){
      FlowRouter.go('/events')
    }
  }

  render() {
    const {event, cover} = this.props
    if (!event) {
        return <div></div>
    }
    return (
      <div>
        <Card>
          <CardMedia>
          <ImageLoader
            src={cover}
          />
          </CardMedia>
            <CardText>
              <RaisedButton
                label="Choose Files"
                labelPosition="before"
                style={styles.Button}
              >
                <input multiple={true} onChange={this.upload.bind(this)} type="file" style={styles.fileInput} />
              </RaisedButton>
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
