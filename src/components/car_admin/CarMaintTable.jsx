import {
  AppBar,
  Backdrop,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { formatNumber } from '../../utils/formatNumber';

const CarMaintTable = ({ maintData, setMaintData, carCode, setCheckedRow }) => {
  const [openImg, setOpenImg] = useState(false);
  const handleClose = () => {
    setOpenImg(false);
  };
  const handleOpen = () => {
    setOpenImg(true);
  };

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e) => {
    e.stopPropagation();
    // 이미지가 끝에 도달하면 첫 번째 이미지로 이동
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    // 이미지가 처음에 도달하면 마지막 이미지로 이동
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleMaintImg = (e, url) => {
    e.stopPropagation();
    // 사진 보여주기
    setImages(url);
    handleOpen();
  };

  const handleImageDownload = (e) => {
    e.stopPropagation();
    console.log(images[currentImageIndex]);
    const url = `http://localhost:8081/manager/download?originalFileName=${images[currentImageIndex]}`;
    axiosInstance.axiosInstance
      .get(url, { responseType: 'blob' })
      .then((response) => {
        const name = response.data.type;
        const blob = new Blob([response.data], {
          type: response.headers['content-type']
        });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        link.style.cssText = 'display:none';
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.log('이미지 다운로드 에러 발생!!!');
      });
  };
  const columns = [
    {
      field: 'maint_name',
      headerName: '정비내역',
      width: 128,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'maint_start_at',
      headerName: '정비 시작일',
      width: 128,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'maint_end_at',
      headerName: '정비 종료일',
      type: '',
      width: 128,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'maint_cost',
      headerName: '금액',
      type: 'number',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography variant="body2">
          {formatNumber(parseInt(params.value))}원
        </Typography>
      )
    },
    {
      field: 'pay_method',
      headerName: '지불 방법',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'mc_name',
      headerName: '정비 회사',
      width: 128,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'mem_info', // 추후 수정 필요
      headerName: '등록 사원',
      sortable: false,
      width: 100,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Tooltip title={params.value[1]} placement="bottom-start">
          <Typography>{params.value[0]}</Typography>
        </Tooltip>
      )
    },
    {
      field: 'memo',
      headerName: '메모',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.row.memo} placement="bottom-start">
          <Typography
            variant="caption"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {params.row.memo}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: 'url',
      headerName: '사진',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      width: 128,
      renderCell: (params) =>
        params.row.url.length > 0 ? (
          <IconButton
            aria-label="delete"
            size="large"
            onClick={(e) => {
              handleMaintImg(e, params.row.url);
            }}
          >
            <InsertPhotoIcon />
          </IconButton>
        ) : (
          '-'
        )
    }
  ];

  // const [rows, setRows] = useState([]);

  useEffect(() => {
    axiosInstance.axiosInstance
      .get('/manager/car/maintOneCarRecordList', {
        params: {
          car_code: carCode
        }
      })
      .then((res) => {
        console.log(res.data);
        const newData = res.data.map((item, index) => {
          return {
            maint_name: item.carMaintResponseVO.maint_name,
            // created_at: item.created_at,
            maint_start_at: new Date(item.maint_start_at).toLocaleDateString(),
            maint_end_at:
              item.maint_end_at !== null
                ? new Date(item.maint_end_at).toLocaleDateString()
                : '-',
            maint_cost: item.maint_cost,
            pay_method: item.pay_method,
            mc_name: item.maintComResponseVO.mc_name,
            mem_info: [
              item.memResponseVO.name,
              item.memResponseVO.deptVO.dept_name +
                ' ' +
                item.memResponseVO.position_name
            ],
            memo: item.memo,
            maint_code: item.maint_code,
            url: item.url
          };
        });
        setMaintData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#f0f0f0'
        }
      }}
    >
      <DataGrid
        rows={maintData}
        columns={columns}
        getRowId={(row) => row.maint_code}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        localeText={{
          noRowsLabel: '등록된 정비 내역이 없습니다.'
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          borderRadius: '2px',
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important'
          }
        }}
        onRowSelectionModelChange={(selectionModel) => {
          // 선택된 행의 ID 및 maint_start_at 속성을 추출해서 배열로 저장
          const selectedRowsData = selectionModel.map((selectedId) => {
            const selectedRow = maintData.find(
              (row) => row.maint_code === selectedId
            );
            return {
              id: selectedId,
              maint_start_at: selectedRow ? selectedRow.maint_start_at : null
            };
          });

          // 선택된 행의 데이터 배열을 출력
          console.log(selectedRowsData);

          // 선택된 행의 데이터 배열을 상태로 설정
          setCheckedRow(selectedRowsData);
        }}
      />
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: 'fixed',
          top: 0
        }}
        open={openImg}
        onClick={handleClose}
      >
        <Box sx={{ flexGrow: 1, '& .MuiPaper-root': { border: 'none' } }}>
          <AppBar
            position="fixed"
            sx={{
              top: 0,
              backgroundColor: 'rgba(0,0,0,0)',
              boxShadow: 'none'
            }}
          >
            <Toolbar
              sx={{
                backgroundColor: 'rgba(0,0,0,.5)',
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleImageDownload}
              >
                <FileDownloadIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <IconButton
            sx={{
              background: 'rgba(0,0,0,.2)',
              position: 'absolute',
              left: 0,
              padding: '40px 30px',
              margin: 'auto',
              color: 'white'
            }}
            onClick={handlePrevImage}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            sx={{
              background: 'rgba(0,0,0,.2)',
              position: 'absolute',
              right: 0,
              padding: '40px 30px',
              margin: 'auto',
              color: 'white'
            }}
            onClick={handleNextImage}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          <Box
            sx={{
              transition: 'opacity 300ms ease 0s',
              animationDuration: '300ms',
              animationDirection: 'reverse',
              width: 'auto',
              height: 'auto',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
        </Box>
      </Backdrop>
    </Box>
  );
};

export default CarMaintTable;
