import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    textAlign: "left"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={() => this.setState({ openDrawer: true })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" color="inherit">
              BookingRUs
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
          <Drawer
            open={this.state.openDrawer}
            onClose={() => this.setState({ openDrawer: false })}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={() => this.setState({ openDrawer: false })}
              onKeyDown={() => this.setState({ openDrawer: false })}
            >
              <List>
                <ListItem button key={1}>
                  <ListItemIcon>
                    {4 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={"test"} />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
