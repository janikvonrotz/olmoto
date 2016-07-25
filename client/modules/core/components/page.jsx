import React from 'react';
import {FloatingActionButton} from 'material-ui';
import MarkdownEditor from '../containers/markdown_editor';
import {ContentCreate, ContentSave, ContentClear} from 'material-ui/svg-icons';
import {can_view_component} from '/lib/access_control';
import {marked, customRender} from '../libs/marked';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      text: "# test"
    }
  }

  showEditor(){
    this.setState({editing: true});
  }

  closeEditor(){
    this.setState({
      editing: false,
      text: "# test"
    });
  }

  update(){
    this.setState({editing: false});
    console.log("save")
  }

  handleChange(name, value){
    this.setState({text: value});
  }

  render() {
    const {editing, text} = this.state
    const {title} = this.props
    return (
      <div>
        {!editing && can_view_component('page.edit') ? <FloatingActionButton
          onTouchTap={this.showEditor.bind(this)}
        >
          <ContentCreate />
        </FloatingActionButton> : null }

        {editing ? <FloatingActionButton
          onTouchTap={this.update.bind(this)}
        >
          <ContentSave />
        </FloatingActionButton> : null}

        {editing ? <FloatingActionButton
          onTouchTap={this.closeEditor.bind(this)}
        >
          <ContentClear />
        </FloatingActionButton> : null}

        {editing ?
          <MarkdownEditor
            name="content"
            onChange={this.handleChange.bind(this)}
            text={text}
            fileUsage="page" /> :
          <div dangerouslySetInnerHTML={{__html: marked(text, {renderer: customRender})}} />
        }
      </div>
    );
  }
}

export default Page;
