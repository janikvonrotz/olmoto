import React from 'react';
import {TextField, RaisedButton} from 'material-ui';
import FileList from '../containers/file_list';

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
    _.map(event.target.files, (file) => {
      file.albumId = this.props.albumId
      this.props.upload(file);
    });
  }

  componentDidMount(){
    this.props.setLocalState({title: "Files"})
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
          label="Choose Files"
          labelPosition="before"
          style={styles.Button}
        >
          <input multiple={true} onChange={this.upload.bind(this)} type="file" style={styles.fileInput} />
        </RaisedButton>
        <FileList albumId={this.props.albumId} filterText={this.state.filterText} />
      </div>
    );
  }
}

export default FilePage;
