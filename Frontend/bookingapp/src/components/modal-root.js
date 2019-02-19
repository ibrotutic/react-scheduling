import React from "react";
import connect from "react-redux/es/connect/connect";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import EmployeeMenu from "./employee-dropdown";
import Calendar from "react-calendar";
import OrganizationSchedulingModal from "./organization-scheduling-modal";

function getModalStyle() {
    return {
        position: `absolute`, left: `50%`, top: `50%`,
        transform: `translate(-50%, -50%)`
    };
}

function CalendarComponent(props) {
    if (props.props.scheduling) {
        return <Calendar/>
    }
    else {
        return <Button onClick={props.props.clickSchedule}>Schedule</Button>
    }
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    }
});

class ModalRoot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orgInfo: "",
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.hideModal();
    }

    render() {
        let props = {
            onClick: this.onClick,
            orgInfo: this.props.orgInfo.orgInfo
        };

        if(this.props.open) {
            return (
                <OrganizationSchedulingModal props={props}/>
            )
        }
        return null;
    }
}

function closeModal() {
    console.log("should close...");
    return {
        type: 'HIDE_MODAL'
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => {
            dispatch(closeModal())
        }
    }
};

function mapStateToProps(state) {
    return {
        orgInfo: state.orgInfo,
        open: state.orgInfo.open
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);