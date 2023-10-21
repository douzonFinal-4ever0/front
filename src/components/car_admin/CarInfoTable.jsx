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

const CommonTable = ({ columns, rows, setTabData, filter, searchValue }) => {
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
        content: <CarDetail carCode={value} />
      },
      {
        title: '정비 및 지출',
        content: <>정비 지출 페이지</>
      }
    ]);
    dispatch(openDrawer());
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 700, borderRadius: 0 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ borderColor: '#eeeee' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
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
                          ) : value === '법인' ? (
                            <Chip
                              label="법인"
                              size="small"
                              sx={{ backgroundColor: '#90caf9' }}
                            />
                          ) : (
                            <Chip
                              label="개인"
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

export default CommonTable;
