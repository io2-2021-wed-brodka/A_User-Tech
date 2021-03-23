import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Masonry from "react-masonry-css";

const useStyles = makeStyles((theme) => ({
  masonryGrid: {
    display: "flex",
    width: "inherit",
  },
  masonryColumn: {
    backgroundClip: "padding-box",
  },
}));

const propTypes = {
  children: PropTypes.node,
};

const BreakpointMasonry = ({ children }: { children: any }) => {
  const classes = useStyles();

  const breakpointCols = {
    default: 4,
    1664: 3,
    1248: 2,
    832: 1,
  };

  return <Masonry
    breakpointCols={breakpointCols}
    className={classes.masonryGrid}
    columnClassName={classes.masonryColumn}
  >
    {children}
  </Masonry>

};

BreakpointMasonry.propTypes = propTypes;

export default BreakpointMasonry;