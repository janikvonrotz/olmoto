import React from 'react';
import {TextField, RaisedButton} from 'material-ui';
import FileList from '../containers/file_list';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
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

class FilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {filterText: ''};
  }

  updateFilterText(event) {
    this.setState({
      filterText: event.target.value,
    });
  }

  upload(event){
    console.log(event.target.files);
    _.map(event.target.files, (file) => {
      this.props.upload(file);
    });
  }

  render() {
    return (
      <div>
        <TextField
          id="search"
          value={this.state.value}
          floatingLabelText="Search"
          onChange={this.updateFilterText.bind(this)}
        />
        <RaisedButton
          label="Choose an Image"
          labelPosition="before"
          style={styles.button}
        >
          <input onChange={this.upload.bind(this)} type="file" style={styles.exampleImageInput} />
        </RaisedButton>
        <FileList filterText={this.state.filterText} />
      </div>
    );
  }
}

export default FilePage;
