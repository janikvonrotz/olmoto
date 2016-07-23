import React from 'react';
import {TextField, FloatingActionButton, SelectField, MenuItem, RaisedButton, Card, CardMedia, CardTitle, CardText} from 'material-ui';
import {HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';
import keydown from 'react-keydown';
import ImageLoader from '../../core/components/image_loader.jsx';
import {cannot_access} from '/lib/access_control';

class FileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: props.file
    }
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
    if(['albumId'].indexOf(name) > -1){
      file.meta[name] = value;
    }else{
      file[name] = value;
    }
    this.setState({file: file})
  }

  updateSelectField(name, event, index, value){
    var file = this.state.file;
    if(['albumId'].indexOf(name) > -1){
      file.meta[name] = value;
    }else{
      file[name] = value;
    }
    this.setState({file: file})
  }

  update() {
    this.props.update(this.state.file);
  }

  remove() {
    this.props.remove(this.state.file);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.file._id != nextProps.file._id){
      this.setState({
        file: nextProps.file
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
    return (
      <div>
        <Card>
          <CardMedia
            overlay={<CardTitle title={file.name} subtitle={file.description} />}
          >
            <ImageLoader
              src={file.src}
            />
          </CardMedia>
          <CardText>
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
              value={file.meta.albumId}
              onChange={this.updateSelectField.bind(this, 'albumId')}
              floatingLabelText="Album"
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
