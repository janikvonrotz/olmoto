import React from 'react';
import {FloatingActionButton, Card, CardTitle, CardMedia} from 'material-ui';
import {HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';
import keydown from 'react-keydown';

class FileView extends React.Component {
  constructor(props) {
    super(props);
  }

  @keydown( 'right' )
  goToNext(){
    this.props.goTo("next", this.props.file);
  }

  @keydown( 'left' )
  goToPrevious(){
    this.props.goTo("previous", this.props.file);
  }

  render() {
    const {file} = this.props;
    if(!file){return <div></div>}
    return (
      <div>
        <Card>
          <CardMedia
            overlay={<CardTitle title={file.name} subtitle="some description" />}
          >
            <img src={file.src} />
          </CardMedia>

          <FloatingActionButton onTouchTap={this.goToPrevious.bind(this)}>
            <HardwareKeyboardArrowLeft />
          </FloatingActionButton>

          <FloatingActionButton onTouchTap={this.goToNext.bind(this)}>
           <HardwareKeyboardArrowRight />
          </FloatingActionButton>
        </Card>
      </div>
    );
  }
}

export default FileView;
