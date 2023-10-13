import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '../../components/common/Spinner';
import { Button } from '@mui/material';
import axios from 'axios';

const DashBoard = () => {
  const [mrList, setMrList] = useState([]);

  const handleClick = () => {
    // alert('test');
    axios.get('http://localhost:8081/mr/mrList').then((res) => {
      console.log(res.data);
      setMrList(res.data);
    });
  };
  return (
    <div>
      <Button variant="text" onClick={handleClick}>
        테스트
      </Button>
      {mrList.map((mr) => {
        return (
          <table>
            <tr key={mr.mr_code}>
              <td>{mr.mr_name}</td>
            </tr>
          </table>
        );
      })}
    </div>
  );
};

export default DashBoard;
