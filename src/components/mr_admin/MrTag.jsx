import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useEffect, useState } from 'react';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MrTag = ({ onTagSelect, initailTagSelect, selectedRowData }) => {
  const filterInitialTagSelect = initailTagSelect
    ? initailTagSelect.filter((tag) => tag.keyword_name !== null)
    : [];
  const [selectedTags, setSelectedTags] = useState(filterInitialTagSelect);
  // console.log(filterInitialTagSelect);

  useEffect(() => {
    if (selectedRowData) {
      const initialKeywords = selectedRowData.mr_keyword.map(
        (keyword) => keyword.keyword_name
      );
      const filteredKeywords = initialKeywords.filter((keyword) =>
        tags.some((tag) => tag.keyword_name === keyword)
      );
      setSelectedTags(initialKeywords);
      // onTagSelect(filteredKeywords);
      onTagSelect(initialKeywords);
    }
  }, [selectedRowData]);

  const handleTagSelection = (event, value) => {
    setSelectedTags(value);
    onTagSelect(value);
  };

  const isOptionEqualToValue = (option, value) => {
    // 여기에서 옵션과 값의 일치 여부를 정의합니다.
    return option.keyword_name === value.keyword_name;
  };
  return (
    <Autocomplete
      multiple
      limitTags={4}
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
            checked={
              selected ||
              initailTagSelect.some(
                (tag) => tag.keyword_name === option.keyword_name
              )
            }
          />
          {option.keyword_name}
        </li>
      )}
      style={{ width: 'auto' }}
      renderInput={(params) => <TextField {...params} label="" />}
      value={selectedTags}
      onChange={handleTagSelection}
      isOptionEqualToValue={isOptionEqualToValue}
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
