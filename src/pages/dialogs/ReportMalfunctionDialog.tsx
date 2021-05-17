import React, {ChangeEvent, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";
import Transition from "../../layout/Transition";

interface MalfunctionDialogProps {
    open: boolean,
    bikeId: string,
    closeDialog: any,
    reportMalfunction: (bikeId: string, description: string) => void;
}

const ReportMalfunctionDialog = (props: MalfunctionDialogProps) => {
    const [description, setDescription] = useState<string>();

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const onReportClick = () => {
        props.reportMalfunction(props.bikeId, description ?? '');
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
                <TextField multiline onChange={handleDescriptionChange} placeholder="Malfunction description"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onReportClick} color="secondary">Report</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ReportMalfunctionDialog;