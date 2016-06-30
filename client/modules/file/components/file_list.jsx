import React from 'react';
import {GridList, GridTile, IconButton, Subheader} from 'material-ui';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

class FileList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFiles() {
    return (
      this.props.files.map((file) => {
        return (
          <li key={file._id}>{file.title}</li>
        );
      })
    );
  }

  renderGrid(){
    return (
      <GridList
        cellHeight={200}
        style={styles.gridList}
      >
        <Subheader>December</Subheader>
        {this.props.files.map((file) => (
          <GridTile
            key={file._id}
            title={file.title}
            subtitle={<span>by <b>{file.author}</b></span>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
            <img src={file.img} />
          </GridTile>
        ))}
      </GridList>
    )
  }

  render() {
    console.log(this.props)
    return (
      <div>
        FileList
        <ul>
        {this.renderFiles()}
        </ul>
        {this.renderGrid()}
      </div>
    );
  }
}

export default FileList;
