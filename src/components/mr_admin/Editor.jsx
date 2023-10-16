import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';
import { useState } from 'react';

const Editor = ({ onEditorChange }) => {
  const [editorData, setEditorData] = useState(' ');
  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
      onReady={(editor) => {
        console.log('에디터 사용중임', editor);
        const data = editor.getData();
        setEditorData(data);
        onEditorChange(data);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setEditorData(data);
        onEditorChange(data);
      }}
      onBlur={(event, editor) => {
        // console.log('Blur', editor);
      }}
      onFocus={(event, editor) => {
        // console.log('Focus', editor);
      }}
    ></CKEditor>
  );
};

export default Editor;
