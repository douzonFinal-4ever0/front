import React from 'react';
import Pagination from '../../components/common/Pagination';
import { useState } from 'react';

function Register() {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  // const itemsPerPage = 5; // 각 페이지에 표시할 항목 수
  // const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  // const [data, setData] = useState([
  //   // 여기에 표시할 데이터 배열을 설정합니다.
  // ]);

  // // 현재 페이지의 항목을 계산하는 함수
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // // 페이지 변경 핸들러
  // const handlePageChange = (event, newPage) => {
  //   setCurrentPage(newPage);
  // };
  // const pageCount = Math.ceil(data.length / itemsPerPage);
  return (
    <div>
      {/* {currentItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))} */}
      mr_Register
      <Pagination
        count={10} // 전체 페이지 수 계산
        page={page}
        handleChange={handleChange}
      />
    </div>
  );
}

export default Register;
