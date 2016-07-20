import React from 'react';
import {TextField, FloatingActionButton, SelectField, MenuItem, RaisedButton, Card, CardMedia, CardTitle, CardText} from 'material-ui';
import {HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';
import keydown from 'react-keydown';
import Spinner from './spinner.jsx'
import {cannot_access} from '/lib/access_control';

class FileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: props.file,
      fileStatus: 'loading'
    }
  }

  handleFileLoaded() {
    this.setState({ fileStatus: 'loaded' });
  }

  handleFileLoadError() {
    this.setState({ fileStatus: 'failed to load' });
  }

  @keydown( 'right' )
  goToNext(){
    this.props.goTo("next", this.state.file);
  }

  @keydown( 'left' )
  goToPrevious(){
    this.props.goTo("previous", this.state.file);
  }

  updateField(name, event, value) {
    var file = this.state.file;
    file[name] = value;
    this.setState({file: file})
  }

  updateSelectField(name, event, index, value){
    var file = this.state.file;
    file[name] = value;
    this.setState({file: file})
  }

  update() {
    this.props.update(this.state.file);
  }

  remove() {
    this.props.remove(this.state.file);
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

  componentWillReceiveProps(nextProps){
    if(this.props.file._id != nextProps.file._id){
      this.setState({
        file: nextProps.file,
        fileStatus: 'loading'
      })
    }
  }

  componentDidMount(){
    if(cannot_access('file.edit')){
      FlowRouter.go('/files')
    }
  }

  render() {
    const {file} = this.state;
    const {events} = this.props;
    if(!file){return <div></div>}
    console.log(file)
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
              value={file.name}
              floatingLabelText="Name"
              onChange={this.updateField.bind(this, 'name')}
            />

            <TextField
              value={file.description}
              floatingLabelText="Description"
              onChange={this.updateField.bind(this, 'description')}
            />

            <SelectField
              value={file.albumId}
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
