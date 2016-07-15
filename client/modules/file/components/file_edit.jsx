import React from 'react';
import {TextField, FloatingActionButton, SelectField, MenuItem, RaisedButton, Card, CardMedia, CardTitle, CardText} from 'material-ui';
import {HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';
import keydown from 'react-keydown';
import Spinner from './spinner.jsx'

class FileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileStatus: 'loading'
    };
  }

  handleFileLoaded() {
    this.setState({ fileStatus: 'loaded' });
  }

  handleFileLoadError() {
    this.setState({ fileStatus: 'failed to load' });
  }

  @keydown( 'right' )
  goToNext(){
    this.setState({ fileStatus: 'loading' });
    this.props.goTo("next", this.props.file);
  }

  @keydown( 'left' )
  goToPrevious(){
    this.setState({ fileStatus: 'loading' });
    this.props.goTo("previous", this.props.file);
  }

  updateField(name, event, value) {
    this.props.file[name] = value;
  }

  updateSelectField(name, event, index, value){
    var state = {}
    state[name] = value
    this.setState(state)
    this.props.file[name] = value;
  }

  update() {
    this.props.update(this.props.file);
  }

  remove() {
    this.props.remove(this.props.file);
  }

  renderFileStatus(){
    var actions = {
      'loading': () => {
        return (<Spinner />);
      },
      'loaded': () => {
        return null;
      },
      'failed to load': () => {
        return (<p>{this.state.fileStatus}</p>);
      },
    };
    return actions[this.state.fileStatus]();
  }

  render() {
    const {file, events} = this.props;
    if(!file){return <div></div>}
    return (
      <div>
        <Card>
          <CardMedia
            overlay={<CardTitle title={file.name} subtitle={file.description} />}
          >
            <img
              src={file.src}
              onLoad={this.handleFileLoaded.bind(this)}
              onError={this.handleFileLoadError.bind(this)}
            />
          </CardMedia>
          <CardText>
            {this.renderFileStatus()}

            <TextField
              defaultValue={file.name}
              floatingLabelText="Name"
              onChange={this.updateField.bind(this, 'name')}
            />

            <TextField
              defaultValue={file.description}
              floatingLabelText="Description"
              onChange={this.updateField.bind(this, 'description')}
            />

            <SelectField
              value={this.state.albumId}
              onChange={this.updateSelectField.bind(this, 'albumId')}
              floatingLabelText="Event"
            >
              {events.map((event) => {
                return (<MenuItem key={event._id} value={event._id} primaryText={event.title} />);
              })}
            </SelectField>

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

            <FloatingActionButton onTouchTap={this.goToPrevious.bind(this)}>
              <HardwareKeyboardArrowLeft />
            </FloatingActionButton>

            <FloatingActionButton onTouchTap={this.goToNext.bind(this)}>
             <HardwareKeyboardArrowRight />
            </FloatingActionButton>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default FileEdit;
