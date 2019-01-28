import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Today from "@material-ui/icons/CalendarTodaySharp";
import Search from "@material-ui/icons/Search";
import Alarm from "@material-ui/icons/Alarm";
import Settings from "@material-ui/icons/Settings";
//import { Link } from "react-router-dom";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class NavbarDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar>?</Avatar>
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <Divider />
          {["Search", "My Calendar", "Appointments", "Settings"].map(
            (text, index) => (
              // <Link to={"/other"}>
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <Search />
                  ) : index === 1 ? (
                    <Today />
                  ) : index === 2 ? (
                    <Alarm />
                  ) : (
                    <Settings />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              // </Link>
            )
          )}
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={this.props.show} onClose={() => this.props.close()}>
          <div tabIndex={0} role="button">
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

NavbarDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavbarDrawer);