import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';
import { useState } from 'react';
import '../../theme/css/ckeditor.css'; // ckeditor.css 파일을 로드
import { FormControl, MenuItem, Select } from '@mui/material';
const Editor = ({ onEditorChange }) => {
  const [editorData, setEditorData] = useState('<p>공지사항 작성</p>');
  // CKEditor 컴포넌트를 감싸는 div 요소에 스타일을 적용하여 높이를 설정
  const editorContainerStyle = {
    height: 'auto' // 원하는 높이로 변경
  };

  return (
    <div style={editorContainerStyle}>
      {/* <FormControl>
        <Select placeholder="탬플릿" value="미팅룸">
          <MenuItem value="미팅룸">미팅룸</MenuItem>
          <MenuItem value="소회의실">소회의실</MenuItem>
          <MenuItem value="중회의실">중회의실</MenuItem>
          <MenuItem value="대회의실">대회의실</MenuItem>
        </Select>
      </FormControl> */}
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={(editor) => {
          console.log('에디터 사용중임', editor);
          const data = editor.getData();
          setEditorData(data);
          // onEditorChange(data);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          // onEditorChange(data);
        }}
        onBlur={(event, editor) => {
          // console.log('Blur', editor);
        }}
        onFocus={(event, editor) => {
          // console.log('Focus', editor);
        }}
      />
    </div>
  );
};

export default Editor;
