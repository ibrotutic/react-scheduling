import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LoadingIndicator from "./loading-indicator";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class EmployeeMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: props.employees,
      selectedIndex: 0
    };
  }

  state = {
    anchorEl: null,
    selectedIndex: 0
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    if (this.state.employees === undefined) {
      return <LoadingIndicator />;
    } else {
      return (
        <div className={classes.root}>
          <List component="nav">
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              onClick={this.handleClickListItem}
            >
              <ListItemText
                primary="Select an employee"
                secondary={
                  this.state.employees.length === 0
                    ? "No Employees Available"
                    : this.state.employees[this.state.selectedIndex].name
                }
              />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {this.state.employees.map((employee, index) => (
              <MenuItem
                key={index}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {employee.fname + " " + employee.lname}
              </MenuItem>
            ))}
          </Menu>
        </div>
      );
    }
  }
}

EmployeeMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmployeeMenu);
