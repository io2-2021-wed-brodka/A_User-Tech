import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Masonry from "react-masonry-css";

/////////////////////////////////////////
//  Styles
/////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
  masonryGrid: {
    display: "flex",    
    width: "600",
  },
  masonryColumn: {
    paddingLeft: theme.spacing(1),
    backgroundClip: "padding-box",
  },
}));

/////////////////////////////////////////
//  PropTypes
/////////////////////////////////////////

const propTypes = {
  children: PropTypes.node,
};

/////////////////////////////////////////
//  Component
/////////////////////////////////////////

const BreakpointMasonry = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const breakpointCols = {
    default: 4,
    [theme.breakpoints.values.xl]: 4,
    [theme.breakpoints.values.lg]: 3,
    [theme.breakpoints.values.md]: 2,
    [theme.breakpoints.values.sm]: 1,
    [theme.breakpoints.values.xs]: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className={classes.masonryGrid}
      columnClassName={classes.masonryColumn}
    >
      {children}
    </Masonry>
  );
};

BreakpointMasonry.propTypes = propTypes;

export default BreakpointMasonry;