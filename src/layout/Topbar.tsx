import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const Topbar = () => {
    return (
        <div>
            <AppBar>
                <Toolbar>            
                    <Typography variant="h6">
                    Bikes
                    </Typography>                
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </div>
    )
}

export default Topbar;