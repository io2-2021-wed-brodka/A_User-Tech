import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Malfunction } from '../../models/malfunctions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),      
      display: "flex",
      width: "100%",
      justify: "center", 
      alignItems: "center",      
    },
    table: {
      minWidth: 750,
    },
    blockButton: {
      color: "#ee6002"
    },
    unblockButton: {
        color: "#09af00"
    },
    widerCell:{
      minWidth: '4em'
    },
    widestCell:{
      minWidth: '15em'
    },
    addButton: {
      margin: theme.spacing(2),
    },
  })
);

export interface MalfunctionsTableProps {
  setMalfunctions: (value: React.SetStateAction<Malfunction[]>) => void;  
  malfunctions: Malfunction[];
}

const MalfunctionsTable = (props: MalfunctionsTableProps) => {
    const classes = useStyles()
   
  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Malfunction</TableCell>
          <TableCell align="right" className={classes.widerCell}>User Id</TableCell>
          <TableCell align="right" className={classes.widerCell}>Bike Id</TableCell>
          <TableCell align="right" className={classes.widestCell}>Description</TableCell>
          <TableCell align="center" colSpan={3}>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.malfunctions.map((malf) => (
          <TableRow key={malf.id}>
            <TableCell component="th" scope="row">
              No. {malf.id}
            </TableCell>
            <TableCell align="right">{malf.bikeId}</TableCell>
            <TableCell align="right">
              {malf.reportingUserId}
            </TableCell>
            <TableCell align="right">{malf.description ?? "-"}</TableCell>
            <TableCell align="right">
                <Button className={classes.blockButton} disabled>
                    Approve
                </Button>
            </TableCell>
            <TableCell align="center">
              <Button color="secondary" disabled>
                Deny
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button color="primary" disabled>
                Fixed
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default MalfunctionsTable;
