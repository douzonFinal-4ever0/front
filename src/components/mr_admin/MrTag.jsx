import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MrTag = ({ onTagSelect }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelection = (event, value) => {
    setSelectedTags(value);
    onTagSelect(value);
  };
  return (
    <Autocomplete
      multiple
      limitTags={3}
      id="checkboxes"
      options={tags}
      disableCloseOnSelect
      getOptionLabel={(option) => option.keyword_name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.keyword_name}
        </li>
      )}
      style={{ width: 'auto' }}
      renderInput={(params) => <TextField {...params} label="회의실 태그" />}
      value={selectedTags}
      onChange={handleTagSelection}
    />
  );
};
export default MrTag;

const tags = [
  { keyword_name: '브레인스토밍' },
  { keyword_name: '프로젝트회의' },
  { keyword_name: '주간회의' },
  { keyword_name: '프레젠테이션' },
  { keyword_name: '전략회의' },
  { keyword_name: '미팅룸' },
  { keyword_name: '워크샵' },
  { keyword_name: 'U자형' }
];
