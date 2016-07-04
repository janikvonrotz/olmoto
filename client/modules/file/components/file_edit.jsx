import React from 'react';
import {FloatingActionButton, SelectField, MenuItem, RaisedButton} from 'material-ui';
import {HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';

class FileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {albumId: props.file.albumId};
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

  render() {
    const {file, events} = this.props;
    if(!file){return <div></div>}
    return (
      <div className="file-edit">
        FileEdit
        {file ? file._id : null}
        <SelectField
          value={this.state.albumId}
          onChange={this.updateSelectField.bind(this, 'albumId')}
          floatingLabelText="Event"
        >
            {events.map((event) => {
              return (<MenuItem key={event._id} value={event._id} primaryText={event.title} />);
            })}
        </SelectField>
        <FloatingActionButton>
         <HardwareKeyboardArrowLeft />
       </FloatingActionButton>
       <FloatingActionButton>
        <HardwareKeyboardArrowRight />
      </FloatingActionButton>
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
      </div>
    );
  }
}

export default FileEdit;
