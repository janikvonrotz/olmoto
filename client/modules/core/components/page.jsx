import React from 'react';
import {FloatingActionButton} from 'material-ui';
import MarkdownEditor from '../containers/markdown_editor';
import {ContentCreate, ActionDone, ContentClear} from 'material-ui/svg-icons';
import {can_view_component} from '/lib/access_control';
import {marked, customRender} from '../libs/marked';

const style = {
  fontFamily: 'Roboto',
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    const {page} = props
    this.state = {
      editing: false,
      text: page.content || ''
    }
  }

  showEditor(){
    this.setState({editing: true});
  }

  closeEditor(){
    this.setState({
      editing: false,
      text: this.props.page.content
    });
  }

  update(){
    var {page} = this.props
    this.setState({editing: false});
    page.content = this.state.text
    this.props.update(page)
  }

  handleChange(name, value){
    this.setState({text: value});
  }

  render() {
    const {page} = this.props
    const {editing, text} = this.state
    if(!page){return (<div></div>)}
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
          <ActionDone />
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
          <div
            dangerouslySetInnerHTML={{__html: marked(text, {renderer: customRender})}}
            style={style}
          />
        }
      </div>
    );
  }
}

export default Page;
