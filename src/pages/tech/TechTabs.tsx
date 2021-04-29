import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { TabPanel } from '../../components/TabPanel';
import MainPage from '../mainPage/MainPage';
import TechPage from './TechPage';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TechTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs variant={"fullWidth"} value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Main Page" />
                <Tab label="Tech Page" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <MainPage />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TechPage />
            </TabPanel>
        </div>
    );
}