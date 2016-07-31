import React from 'react';
import {Tabs, Tab} from 'material-ui';
import {Editor, EditorState, ContentState, Modifier} from 'draft-js';
import {darkBlack, grey400} from 'material-ui/styles/colors';
import {marked, customRender} from '../libs/marked';

const styles = {
  editor: {
    minHeight: '400px',
    padding: '20px',
    backgroundColor: darkBlack,
    color: grey400,
    fontFamily: 'Roboto',
  },
  preview: {
    fontFamily: 'Roboto',
  },
}

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);

    // create state for editor and html preview
    this.state = {
      htmlRendered: marked(this.props.text, {renderer: customRender}),
      editorState: EditorState.createWithContent(ContentState.createFromText(this.props.text))
    };

    // focus editor
    this.focus = () => this.refs.editor.focus();
  }

  update(editorState){
    // get plain text from editor
    var text = editorState.getCurrentContent().getPlainText();

    // update state
    this.setState({
      editorState: editorState,
      htmlRendered: marked(text, {renderer: customRender})
    });

    // if onChange is set call it
    this.props.onChange(this.props.name, text)
  }

  // upload file
  upload(file, selection){

    this.props.upload(file, (file) => {

      // create url
      var url = `![${file._id}](/cdn/storage/files/${file._id}/preview/)`

      // insert url into editor
      const editorState = this.state.editorState;
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      if(!selection){selection = selectionState;}
      const cs = Modifier.insertText(contentState, selection, url)
      const es = EditorState.push(editorState, cs, 'insert-fragment');

      // update state
      this.update(es)
    })
  }

  handlePastedFiles(files){
    _.each(files, (file) => {
      file.usage = this.props.fileUsage || '';
      file.name = `clipboard.${file.type.split("/")[1]}`
      this.upload(file);
    });
  }

  handleDroppedFiles(selection, files){
    _.each(files, (file) => {
      file.usage = this.props.fileUsage || '';
      this.upload(file, selection);
    });
  }

  getValue() {
    return this.state.editorState.getCurrentContent().getPlainText();
  }

  render() {
    const {editorState, htmlRendered} = this.state;
    return (
      <div>
        <Tabs>
          <Tab label="Editor">
            <div style={styles.editor} onTouchTap={this.focus}>
              <Editor
                editorState={editorState}
                onChange={this.update.bind(this)}
                handlePastedFiles={this.handlePastedFiles.bind(this)}
                handleDroppedFiles={this.handleDroppedFiles.bind(this)}
                ref="editor"
              />
            </div>
          </Tab>
          <Tab
            label="Preview"
          >
            <div
              dangerouslySetInnerHTML={{__html: htmlRendered}}
              style={styles.preview}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default MarkdownEditor;
