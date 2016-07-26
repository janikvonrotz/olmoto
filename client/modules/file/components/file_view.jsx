import React from 'react';
import {FloatingActionButton, Card, CardTitle, CardMedia, RaisedButton, CardText} from 'material-ui';
import {HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';
import keydown from 'react-keydown';
import ImageLoader from '../../core/components/image_loader.jsx';
import {can_view_component} from '/lib/access_control';

class FileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fileStatus: 'loading' };
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
            overlay={<CardTitle title={file.name} subtitle={file.description} />}
          >
            <ImageLoader
              src={file.src}
            />
          </CardMedia>
          <CardText>
            {can_view_component('file.edit') ? <RaisedButton
              label="Edit"
              linkButton={true}
              href={"/files/" + file._id + "/edit"}
              primary={true}
            /> : null}
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
