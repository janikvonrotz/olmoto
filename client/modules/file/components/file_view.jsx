import React from 'react';
import {FloatingActionButton} from 'material-ui';
import {HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';

class FileView extends React.Component {
  constructor(props) {
    super(props);
  }

  goTo(){
    this.props.goTo("next", this.props.file);
  }

  render() {
    const {file} = this.props;
    return (
      <div>
        {file ? file._id : null}
        <FloatingActionButton>
         <HardwareKeyboardArrowLeft />
       </FloatingActionButton>
       <FloatingActionButton onTouchTap={this.goTo.bind(this)}>
        <HardwareKeyboardArrowRight />
      </FloatingActionButton>
      </div>
    );
  }
}

export default FileView;
