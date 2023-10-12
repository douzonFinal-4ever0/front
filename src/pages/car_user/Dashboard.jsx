import CommonTable from "../../components/common/CommonTable";
import DataGrid from "../../components/common/DataGrid";
import axios from "axios";
import { useState,useEffect } from "react";
import Chip from '@mui/material/Chip';
const Dashboard = () => {
  const [carRez,setCarRez]=useState([]);



  useEffect(()=>{
    axios.get('http://localhost:3001/carRez').then((res)=>{
      console.log(res.data);
      setCarRez(res.data);
    })
  },[])

  const createChip=(params)=>{
    if(params.row.status==="확정"){
      return <Chip label="success" color="success" variant="outlined" />
    }
    if(params.row.status==="완료"){
      return <Chip label="primary" color="primary" variant="outlined" />
    }
    if(params.row.status==="거절"){
      return <Chip label="reject" color="error" variant="outlined" />
    }
  }

// const colums =[
//   {
//     field:"id", row값과 맵핑
//     headerName:"", header에 나올 이름
//     width:100, colums의 너비
//     editable:true/false, 수정 가능 여부
//     type:number, 타입 숫자일때만 (선택)
//     description:"설명", colum에 마우스를 가져다 댔을때 나오는 설명
//     valueGetter:(params)=> value값 커스텀
//       `${params.row.mem_name} / ${params.row.dept_name}`,
//     renderCell : 셀의 모양 변경
//   },
// ];
const colums=[
  {
    field:"status",
    headerName:"상태",
    width:100,
    description:"예약 상태",
    editable:false,
    renderCell: (params) =>(
      createChip(params)
    ),
  },
  {
    field:"start_at",
    headerName:"일자",
    width:150,
    description:"예약 기간",
    editable:false,
  },
  {
    field:"mem/dept",
    headerName:"이름/부서",
    width:200,
    description:"예약자 이름, 부서",
    editable:false,
    valueGetter:(params)=>
     `${params.row.mem_name} / ${params.row.dept_name}`,
  },
  {
    field:"car_name/code",
    headerName:"차종/차번호",
    width:200,
    description:"예약 차량 이름, 번호",
    editable:false,
    valueGetter:(params)=>
     `${params.row.car_name} / ${params.row.car_code}`,
  },
  {
    field:"detail",
    headerName:"목적",
    width:100,
    description:"사량 사용 목적",
    editable:false,
  },
]
  return (
    <div>
      <h1>Dashboard1111</h1>
      {/* <CommonTable colums={["상태","일자","예약자/부서","차종/차량 번호","목적"]} rows={["확정","10.05 (목) 08:00~09:00","이기원/개발","소나타/차량번호","출퇴근"]}/> 
        pageSize=한페이지에 보여줄 개수 
        pageSizeOptions=한페이지에 보여줄 개수 선택을 드롭다운으로 선택 가능 pageSize의 배수로만 했을때보임
        checkbox=체크박스가 유무
        disableRow= true : row를 선택해도 아무것도 없음, false: row를 선택하면 자동으로 checkbox가 클릭됨
      */}
      <DataGrid rows={carRez} columns={colums} width='100%'height={400} pageSize={5} pageSizeOptions={[5,10]} checkbox={true} disableRow={false}/>
  </div>
  )

  
};

export default Dashboard;
