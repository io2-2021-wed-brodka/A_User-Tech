import { createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { blockBike } from '../../api/bikes/blockBike';
import { getAllBikes } from '../../api/bikes/getAllBikes';
import { unblockBike } from '../../api/bikes/unblockBike';
import { deleteMalfunction } from '../../api/malfunctions/deleteMalfunction';
import { Bike } from '../../models/bike';
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
    widerCell: {
      minWidth: '4em'
    },
    widestCell: {
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
  const { enqueueSnackbar } = useSnackbar();
  const [reportedBikes, setReportedBikes] = useState<Bike[]>([]);

  useEffect(() => {
    getAllBikes().then(r => {
      if (r.isError) {
        enqueueSnackbar(`Could not get bikes list: ${r.errorMessage}`, { variant: "error" })
      }
      else {
        const allBikes = r.data?.bikes || [];
        const newReportedBikes = new Array<Bike>(props.malfunctions.length);
        for (let index = 0; index < props.malfunctions.length; index++) {
          const malf = props.malfunctions[index];
          const bike = allBikes.find(b => b.id === malf.bikeId)
          if (bike) {
            newReportedBikes[index] = bike;
          }
        }
        setReportedBikes(newReportedBikes);
      }
    })
  }, [props.malfunctions]);// eslint-disable-line react-hooks/exhaustive-deps

  const approve = (malfunction: Malfunction) => {
    blockBike(malfunction.bikeId).then(r => {
      if (r.isError) {
        enqueueSnackbar(`Could not approve: ${r.errorMessage}`, { variant: "error" })
      }
      else {
        setReportedBikes(prev => prev.map(b => {
          if (b.id !== malfunction.bikeId) return b;
          return { ...b, status: "blocked" }
        }))
      }
    })
  };

  const deny = (malfunction: Malfunction, index: number) => {
    deleteMalfunction(malfunction.id).then(r => {
      if (r.isError) {
        enqueueSnackbar(`Could not deny: ${r.errorMessage}`, { variant: "error" })
      }
      else {
        props.setMalfunctions(prev => {
          const copy = [...prev];
          copy.splice(index, 1)
          return copy;
        })
      }
    })
  }

  const fixed = (malfunction: Malfunction, index: number) => {
    if (reportedBikes.filter(b => b.id === malfunction.bikeId).length === 1) {
      unblockBike(malfunction.bikeId).then(r => {
        if (r.isError) {
          enqueueSnackbar(`Could not unblock bike: ${r.errorMessage}`, { variant: "error" })
        }
        else {
          setReportedBikes(prev => {
            const copy = [...prev];
            copy.splice(index, 1)
            return copy;
          })
        }
      });
    }

    deleteMalfunction(malfunction.id).then(r => {
      if (r.isError) {
        enqueueSnackbar(`Could not deny: ${r.errorMessage}`, { variant: "error" })
      }
      else {
        props.setMalfunctions(prev => {
          const copy = [...prev];
          copy.splice(index, 1)
          return copy;
        })
      }
    })


  }

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
          {props.malfunctions.map((malf, index) => (
            <TableRow key={malf.id}>
              <TableCell component="th" scope="row">
                No. {malf.id}
              </TableCell>
              <TableCell align="right">{malf.reportingUserId}</TableCell>
              <TableCell align="right">
                {malf.bikeId}
              </TableCell>
              <TableCell align="right">{malf.description ?? "-"}</TableCell>
              {reportedBikes[index] && reportedBikes[index].status === "available" &&
                <>
                  <TableCell align="right">
                    <Button className={classes.blockButton} onClick={() => approve(malf)}>
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button color="secondary" onClick={() => deny(malf, index)}>
                      Deny
                    </Button>
                  </TableCell>
                </>
              }
              {reportedBikes[index] && reportedBikes[index].status === "blocked" &&
                <TableCell align="center">
                  <Button color="primary" onClick={() => fixed(malf, index)}>
                    Fixed
              </Button>
                </TableCell>
              }
              {reportedBikes[index] && reportedBikes[index].status === "rented" &&
                <TableCell align="center">
                  <Typography color="primary">
                    Bike rented
                </Typography>
                </TableCell>
              }
              {reportedBikes[index] && reportedBikes[index].status === "reserved" &&
                <TableCell align="center">
                  <Typography color="primary">
                    Bike reserved
                </Typography>
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MalfunctionsTable;
