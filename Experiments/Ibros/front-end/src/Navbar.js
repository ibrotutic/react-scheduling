import React, { Component } from "react";
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
import AccountIcon from "./logos/account_box_48px.svg";
import CalendarIcon from "./logos/icons8-calendar.svg";
import HistoryIcon from "./logos/history_48px.svg";

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
                                <ListItem button key={'Profile'}>
                                    <ListItemIcon>{<img src={AccountIcon} />}</ListItemIcon>
                                    <ListItemText primary={'Profile'} />
                                </ListItem>
                                <ListItem button key={'Your Appointments'}>
                                    <ListItemIcon>{<img src={CalendarIcon} />}</ListItemIcon>
                                    <ListItemText primary={'Your Appointments'} />
                                </ListItem>
                                <ListItem button key={'Past Appointments'}>
                                    <ListItemIcon>{<img src={HistoryIcon} />}</ListItemIcon>
                                    <ListItemText primary={'Past Appointments'} />
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