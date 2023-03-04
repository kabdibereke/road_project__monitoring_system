import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ref, update,onValue } from 'firebase/database'
import { useLocation } from 'react-router-dom';
import { db } from '../../firebase'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Input from '../Input/Input';
import Button from '@mui/material/Button';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export interface ISide {
  left:number,
  right: number
}

export default function Tables() {
  const {pathname} = useLocation()
  const tableRef = React.useRef(null);
  const [sma,setSma] = React.useState<ISide>()
  const [kz,setKz] = React.useState<ISide>()
  const [spcc,setspcc] = React.useState<ISide>()
  const [c4,setC4] = React.useState<ISide>()
  const [zp,setZp] = React.useState<ISide>()
  
  React.useEffect(()=> {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        if(pathname=='/3lot') {
          setSma(data[0]['sma'])
          setKz(data[0]['kz'])
          setspcc(data[0]['spcc'])
          setC4(data[0]['c4'])
          setZp(data[0]['zp'])
            
        }else if(pathname=='/4lot') {
          setSma(data[1]['sma'])
          setKz(data[1]['kz'])
          setspcc(data[1]['spcc'])
          setC4(data[1]['c4'])
          setZp(data[1]['zp'])
            
        }
       
      }
  });
  },[pathname])
 
  return (
    <>
    <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
    ><Button sx={{marginTop: "50px", marginBottom: "20px"}}  variant="contained">Скачать Excel</Button></DownloadTableExcel>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 320 }} aria-label="customized table" ref={tableRef}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Конструктив: {pathname=='/3lot' && "3 Лотa"}
          {pathname=='/4lot' && "4 Лотa"}</StyledTableCell>
            <StyledTableCell align="right">сторона</StyledTableCell>
            <StyledTableCell align="right">выполнено</StyledTableCell>
            <StyledTableCell align="right">всего</StyledTableCell>
            <StyledTableCell align="right">остаток</StyledTableCell>
            <StyledTableCell align="right">фронт</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                  ЩМА 
              </StyledTableCell>
              <StyledTableCell align="right"> 
                   правая 
              </StyledTableCell>
              <StyledTableCell align="right">{ <Input   initialValue={sma?.right!} types={'sma.right'} />}</StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' && "41.944"}
                {pathname=='/4lot' && "46.014"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {pathname=='/3lot' &&(41.944-sma?.right!).toFixed(3)}
                {pathname=='/4lot' &&(46.014-sma?.right!).toFixed(3)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {pathname=='/3lot' &&(kz?.right!-sma?.right!).toFixed(3)}
                {pathname=='/4lot' &&(kz?.right!-sma?.right!).toFixed(3)}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                  
              </StyledTableCell>
              <StyledTableCell align="right"> 
                    левая 
              </StyledTableCell>
              <StyledTableCell align="right">{ <Input   initialValue={sma?.left!} types={'sma.left'} />}</StyledTableCell>
              <StyledTableCell align="right">
                {pathname=='/3lot' && "41.944"}
                {pathname=='/4lot' && "46.014"}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(41.944-sma?.left!).toFixed(3)}
                {pathname=='/4lot' &&(46.014-sma?.left!).toFixed(3)}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(kz?.left!-sma?.left!).toFixed(3)}
                {pathname=='/4lot' &&(kz?.left!-sma?.left!).toFixed(3)}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                КЗ 
              </StyledTableCell>
              <StyledTableCell align="right"> 
              правая 
              </StyledTableCell>
              <StyledTableCell align="right">{ <Input   initialValue={kz?.right!} types={'kz.right'} />}</StyledTableCell>
              <StyledTableCell align="right">
                {pathname=='/3lot' && "41.944"}
                {pathname=='/4lot' && "46.014"}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(41.944-kz?.right!).toFixed(3)}
                {pathname=='/4lot' &&(46.014-kz?.right!).toFixed(3)}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(spcc?.right!-kz?.right!).toFixed(3)}
                {pathname=='/4lot' &&(spcc?.right!-kz?.right!).toFixed(3)}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row" >
             
              </StyledTableCell>
              <StyledTableCell align="right"> 
              левая 
              </StyledTableCell>
              <StyledTableCell align="right">{ <Input   initialValue={kz?.left!} types={'kz.left'} />}</StyledTableCell>
              <StyledTableCell align="right">
                {pathname=='/3lot' && "41.944"}
                {pathname=='/4lot' && "46.014"}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(41.944-kz?.left!).toFixed(3)}
                {pathname=='/4lot' &&(46.014-kz?.left!).toFixed(3)}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(spcc?.left!-kz?.left!).toFixed(3)}
                {pathname=='/4lot' &&(spcc?.left!-kz?.left!).toFixed(3)}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              ЩПЗЦС 
              </StyledTableCell>
              <StyledTableCell align="right"> 
              правая 
              </StyledTableCell>
              <StyledTableCell align="right">
                {<Input   initialValue={spcc?.right!} types={'spcc.right'} />}
              </StyledTableCell>
              <StyledTableCell align="right">
                {pathname=='/3lot' && "41.928"}
                {pathname=='/4lot' && "46.014"}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(41.928-spcc?.right!).toFixed(3)}
                {pathname=='/4lot' &&(46.014-spcc?.right!).toFixed(3)}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(c4?.right!-spcc?.right!).toFixed(3)}
                {pathname=='/4lot' &&(c4?.right!-spcc?.right!).toFixed(3)}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
               
              </StyledTableCell>
              <StyledTableCell align="right"> 
              левая 
              </StyledTableCell>
              <StyledTableCell align="right">
                { <Input   initialValue={spcc?.left!} types={'spcc.left'} />}
              </StyledTableCell>
              <StyledTableCell align="right">
                {pathname=='/3lot' && "41.928"}
                {pathname=='/4lot' && "46.014"}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(41.928-spcc?.left!).toFixed(3)}
                {pathname=='/4lot' &&(46.014-spcc?.left!).toFixed(3)}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(c4?.left!-spcc?.left!).toFixed(3)}
                {pathname=='/4lot' &&(c4?.left!-spcc?.left!).toFixed(3)}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              С4 
              </StyledTableCell>
              <StyledTableCell align="right"> 
              правая 
              </StyledTableCell>
              <StyledTableCell align="right">
                { <Input   initialValue={c4?.right!} types={'c4.right'} />}
              </StyledTableCell>
              <StyledTableCell align="right">
                {pathname=='/3lot' && "41.928"}
                {pathname=='/4lot' && "46.014"}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(41.928-c4?.right!).toFixed(3)}
                {pathname=='/4lot' &&(46.014-c4?.right!).toFixed(3)}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(zp?.right!-c4?.right!).toFixed(3)}
                {pathname=='/4lot' &&(zp?.right!-c4?.right!).toFixed(3)}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              
              </StyledTableCell>
              <StyledTableCell align="right"> 
              левая 
              </StyledTableCell>
              <StyledTableCell align="right">
                { <Input   initialValue={c4?.left!} types={'c4.left'} />}
              </StyledTableCell>
              <StyledTableCell align="right">
                {pathname=='/3lot' && "41.928"}
                {pathname=='/4lot' && "46.014"}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(41.928-c4?.left!).toFixed(3)}
                {pathname=='/4lot' &&(46.014-c4?.left!).toFixed(3)}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(zp?.left!-c4?.left!).toFixed(3)}
                {pathname=='/4lot' &&(zp?.left!-c4?.left!).toFixed(3)}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              ЗП 
              </StyledTableCell>
              <StyledTableCell align="right"> 
              правая 
              </StyledTableCell>
              <StyledTableCell align="right">
               {<Input   initialValue={zp?.right!} types={'zp.right'} />}
              </StyledTableCell>
              <StyledTableCell align="right">
                {pathname=='/3lot' && "41.928"}
                {pathname=='/4lot' && "46.014"}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(41.928-zp?.right!).toFixed(3)}
                {pathname=='/4lot' &&(46.014-zp?.right!).toFixed(3)}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                -
              </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow >
              <StyledTableCell component="th" scope="row">
             
              </StyledTableCell>
              <StyledTableCell align="right"> 
              левая 
              </StyledTableCell>
              <StyledTableCell align="right">
                {<Input   initialValue={zp?.left!} types={'zp.left'} />}</StyledTableCell>
              <StyledTableCell align="right">
                {pathname=='/3lot' && "41.928"}
                {pathname=='/4lot' && "46.014"}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                {pathname=='/3lot' &&(41.928-zp?.left!).toFixed(3)}
                {pathname=='/4lot' &&(46.014-zp?.left!).toFixed(3)}
              </StyledTableCell>
              <StyledTableCell align="right"> 
                -
              </StyledTableCell>
            </StyledTableRow>
            
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}