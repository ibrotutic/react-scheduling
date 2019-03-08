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
  state = {
    employees: this.props.employees,
    anchorEl: null,
    selectedIndex: 0
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null }, () => {
      if (this.props.selectedEmployeeIndex)
        this.props.selectedEmployeeIndex(this.state.selectedIndex);
    });
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
      var emp =
        this.state.employees.length === 0
          ? null
          : this.state.employees[this.state.selectedIndex];

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
                    : emp.fname + " " + emp.lname
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
