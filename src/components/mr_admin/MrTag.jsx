import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MrTag = () => {
  return (
    <Autocomplete
      multiple
      limitTags={3}
      id="checkboxes"
      options={tags}
      disableCloseOnSelect
      getOptionLabel={(option) => option.tag}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.tag}
        </li>
      )}
      style={{ width: 'auto' }}
      renderInput={(params) => <TextField {...params} label="회의실 태그" />}
    />
  );
};
export default MrTag;

const tags = [
  { tag: '브레인스토밍' },
  { tag: '프로젝트회의' },
  { tag: '주간회의' },
  { tag: '프레젠테이션' },
  { tag: '전략회의' },
  { tag: '미팅룸' },
  { tag: '워크샵' },
  { tag: 'U자형' }
];
