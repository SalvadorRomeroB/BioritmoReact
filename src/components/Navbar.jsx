import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

import Colors from "../constants/Colors";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
    textDecoration: "none",
  },
  navbar: {
    backgroundColor: Colors.primary,
  },
  noline: {
    textDecoration: "none",
    color: Colors.white,
  },
});

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <Link className={classes.noline} to="/all-events">
              Biorithm
            </Link>
          </Typography>
          <Typography variant="h5" className={classes.title}>
            <Link className={classes.noline} to="/my-events">
              My Events
            </Link>
          </Typography>
          <Typography variant="h5" className={classes.title}>
            <Link className={classes.noline} to="/created-events">
              Created Events
            </Link>
          </Typography>
          <Typography variant="h5" className={classes.title}>
            <Link className={classes.noline} to="/new-event">
              Create Event
            </Link>
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
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/signin">Signin</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/register">Register</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/profile">Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleLogOut}>
              <Link to="/signin">Logout</Link>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
