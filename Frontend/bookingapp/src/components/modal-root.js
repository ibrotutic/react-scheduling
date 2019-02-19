import React from "react";
import connect from "react-redux/es/connect/connect";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import EmployeeMenu from "./employee-dropdown";

function getModalStyle() {
    return {
        position: `absolute`, left: `50%`, top: `50%`,
        transform: `translate(-50%, -50%)`
    };
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
            orgInfo: ""
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.hideModal();
    }

    render() {
        const { classes } = this.props;

        if(this.props.open) {
            return (
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={true}
                    onClose={this.onClick}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="headline" id="modal-title">
                            {this.props.orgInfo.orgInfo.name}
                        </Typography>
                        <Typography variant="title" id="simple-modal-description">
                            {this.props.orgInfo.orgInfo.service}
                        </Typography>
                        <Typography variant="h5" id="simple-modal-description">
                            {this.props.orgInfo.orgInfo.address}
                        </Typography>
                        <Typography variant="body1" id="modal-description">
                            {this.props.orgInfo.orgInfo.description}
                        </Typography>
                        <EmployeeMenu employees={["ibro", "jake"]}/>
                        <Button onClick={this.onClick}>Close</Button>
                        <Button onClick={this.onClick}>Schedule</Button>
                    </div>
                </Modal>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ModalRoot));