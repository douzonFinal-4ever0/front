import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { palette } from '../../theme/palette';

const TimeTable = ({ schedule }) => {
  return (
    <Table
      sx={{
        width: '100%',
        minWidth: 650,
        borderLeft: `1px solid ${palette.grey['900']}`,
        borderRight: `1px solid ${palette.grey['900']}`
      }}
    >
      <TableHead sx={{ backgroundColor: `${palette.grey['900']}` }}>
        <TableRow>
          {schedule.map((item) => (
            <TableCell
              colSpan={2}
              sx={{
                textAlign: 'center',
                color: `${palette.common.white}`,
                borderRight: `1px solid ${palette.grey['100']}`,
                '&:last-child': {
                  borderRight: 'none'
                }
              }}
            >
              {item.hour}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody
        sx={{ height: '30px', backgroundColor: `${palette.common.white}` }}
      >
        <TableRow>
          {schedule.map((item) => (
            <>
              <TableCell
                sx={{
                  textAlign: 'center',
                  backgroundColor: `${
                    item.firstHalf && `${palette.grey['500']}`
                  }`,
                  borderRight: `1px dashed ${palette.grey['800']}`
                }}
              ></TableCell>
              <TableCell
                sx={{
                  textAlign: 'center',
                  backgroundColor: `${
                    item.secondHalf && `${palette.grey['500']}`
                  }`,
                  borderRight: `1px solid  ${palette.grey['800']}`
                }}
              ></TableCell>
            </>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TimeTable;
