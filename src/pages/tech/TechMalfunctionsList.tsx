import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getMalfunctions } from "../../api/malfunctions/getMalfunctions";
import { Malfunction } from "../../models/malfunctions";
import MalfunctionsTable from "./MalfunctionsTable";

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
      minWidth: 650,
    },
    addButton: {
      margin: theme.spacing(2),
    },
  })
);

const TechMalfunctionPage = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [malfunctions, setMalfunctions] = useState<Malfunction[]>([]);

  useEffect(() => {
    getMalfunctions().then((res) => {
      if (res.isError) {
        enqueueSnackbar("Could not get all malfunctions", { variant: "error" });
      } else {
        setMalfunctions(res.data?.malfunctions || []);
      }
    });
  }, [enqueueSnackbar]);  

  return (
    <Grid container className={classes.content}>
      <div>
        <MalfunctionsTable setMalfunctions={setMalfunctions} malfunctions={malfunctions} />
      </div>
    </Grid>
  );
};

export default TechMalfunctionPage;
