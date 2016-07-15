import React from 'react';
import {FloatingActionButton, Card, CardTitle, CardMedia, RaisedButton, CardText} from 'material-ui';
import {HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';
import keydown from 'react-keydown';
import Spinner from './spinner.jsx'

class FileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fileStatus: 'loading' };
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
    const {file} = this.props;
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
            <RaisedButton
              label="Edit"
              linkButton={true}
              href={file._id + "/edit"}
              primary={true}
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

export default FileView;
