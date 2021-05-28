import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import React from "react";
import Transition from "../../../layout/Transition";

interface RentBikeDialogProps {
    open: boolean;
    bikeId: string;
    onNoClick: () => void;
    onYesClick: () => void;
}

const RentBikeDialog = (props: RentBikeDialogProps) => {


    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.onNoClick}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Rent this bike?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Do you want to rent bike {props.bikeId} ?
                        </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onNoClick} color="primary">
                    No
                        </Button>
                <Button onClick={props.onYesClick} color="primary">
                    Yes
                        </Button>
            </DialogActions>
        </Dialog>
    )
};


export default RentBikeDialog;
