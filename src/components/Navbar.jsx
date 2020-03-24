import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

import Colors from "../constants/Colors";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  navbar: {
    backgroundColor: Colors.primary
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <Link to="/">Biorithm</Link>
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/signin">Signin</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/profile">Profile</Link>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
