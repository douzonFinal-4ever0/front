import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import { openDrawer } from '../../redux/reducer/DrawerSlice';
import { useState } from 'react';
import CarDetail from './CarDetail';
import { Chip } from '@mui/material';
import CarMaint from './CarMaint';

const CarInfoTable = ({
  columns,
  rows,
  deleteCar,
  setTabData,
  filter,
  searchValue,
  setCarListInfo,
  carCounts,
  setCarCounts
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickRow = (event, value) => {
    setTabData([
      {
        title: '차량 정보',
        content: (
          <CarDetail
            carCode={value}
            carListInfo={rows}
            setCarListInfo={setCarListInfo}
            carCounts={carCounts}
            setCarCounts={setCarCounts}
          />
        )
      },
      {
        title: '정비 및 지출',
        content: (
          <CarMaint
            setTabData={setTabData}
            carCode={value}
            carListInfo={rows}
            setCarListInfo={setCarListInfo}
            carCounts={carCounts}
            setCarCounts={setCarCounts}
          />
        )
      }
    ]);
    dispatch(openDrawer());
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 730, borderRadius: 0 }}>
        <Table stickyHeader aria-label="tableTitle">
          <TableHead sx={{ borderColor: '#eeeee' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: '#f0f0f0'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filter !== '삭제'
              ? rows
                  .filter((item) => filter === '전체' || item.type === filter)
                  .filter((item) => item.car_name.includes(searchValue))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        onClick={(event) => {
                          handleClickRow(event, row['car_code']);
                        }}
                      >
                        {columns.map((column) => {
                          let value = row[column.id];
                          if (column.id === 'created_at' && value === null) {
                            value = '최근 운행 없음';
                          } else if (column.id === 'memo' && value === null) {
                            value = '-';
                          }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id !== 'type' ? (
                                value
                              ) : value === '승용차' ? (
                                <Chip
                                  label="승용차"
                                  size="small"
                                  sx={{ backgroundColor: '#90caf9' }}
                                />
                              ) : (
                                <Chip
                                  label="화물차"
                                  size="small"
                                  sx={{ backgroundColor: '#a5d6a7' }}
                                />
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              : deleteCar
                  .filter((item) => item.car_name.includes(searchValue))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        onClick={(event) => {
                          handleClickRow(event, row['car_code']);
                        }}
                      >
                        {columns.map((column) => {
                          let value = row[column.id];
                          if (column.id === 'created_at' && value === null) {
                            value = '최근 운행 없음';
                          } else if (column.id === 'memo' && value === null) {
                            value = '-';
                          }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id !== 'type' ? (
                                value
                              ) : value === '승용차' ? (
                                <Chip
                                  label="승용차"
                                  size="small"
                                  sx={{ backgroundColor: '#90caf9' }}
                                />
                              ) : (
                                <Chip
                                  label="화물차"
                                  size="small"
                                  sx={{ backgroundColor: '#a5d6a7' }}
                                />
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CarInfoTable;
