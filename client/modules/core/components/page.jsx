import React from 'react';
import {FloatingActionButton} from 'material-ui';
import MarkdownEditor from '../containers/markdown_editor';
import {ContentCreate, ContentSave} from 'material-ui/svg-icons';
import {can_view_component} from '/lib/access_control';
import {marked, customRender} from '../libs/marked';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {editing: false}
  }

  toggleEditing(){
    const {editing} = this.state
    const {title} = this.props

    // save if is in edit mode
    if(editing){
      console.log(this.refs.editor)
      // var text = this.refs.editor.getValue()
      // conosle.log(text);
    }
    this.setState({editing: !editing});
  }

  render() {
    const {editing} = this.state
    const {title} = this.props
    return (
      <div>
        <h1>{title}</h1>
        {can_view_component('page.edit') ? <FloatingActionButton
          onTouchTap={this.toggleEditing.bind(this)}
        >
          {editing ? <ContentSave /> : <ContentCreate />}
        </FloatingActionButton> : null }
        {editing ?
          <MarkdownEditor ref="editor" text="test" fileUsage="page" /> :
          <div dangerouslySetInnerHTML={{__html: marked("# test", {renderer: customRender})}} />
        }
      </div>
    );
  }
}

export default Page;
