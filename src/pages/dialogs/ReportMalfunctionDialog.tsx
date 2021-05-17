import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextareaAutosize} from "@material-ui/core";
import Transition from "../../layout/Transition";

interface MalfunctionDialogProps {
    open: boolean,
    bikeId: string,
    closeDialog: any,
    reportMalfunction: (bikeId: string) => void;
}

const ReportMalfunctionDialog = (props: MalfunctionDialogProps) => {
    const onReportClick = () => {
        props.reportMalfunction(props.bikeId);
        props.closeDialog();
    }

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.closeDialog}
            aria-labelledby="malfunction-dialog-slide-title"
            aria-describedby="malfunction-dialog-slide-description">
            <DialogTitle id="malfunction-dialog-slide-title">
                {`Report malfunction for bike: ${props.bikeId}`}
            </DialogTitle>
            <DialogContent>
                <TextareaAutosize placeholder="Malfunction description" rowsMin={5} style={{width: 300}}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onReportClick} color="secondary">Report</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ReportMalfunctionDialog;