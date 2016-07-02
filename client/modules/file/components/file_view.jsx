import React from 'react';
import {FloatingActionButton} from 'material-ui';
import {HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';

class FileView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        FileView
        {this.props.file ? this.props.file._id : null}
        <FloatingActionButton>
         <HardwareKeyboardArrowLeft />
       </FloatingActionButton>
       <FloatingActionButton>
        <HardwareKeyboardArrowRight />
      </FloatingActionButton>
      </div>
    );
  }
}

export default FileView;
