import React, {Component} from 'react';
import Typography from "./modal-root";

class OrganizationSchedulingModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            scheduling: false,
            orgInfo: this.props.orgInfo
        }
    }
    render() {
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={true}
                onClose={this.onClick}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="headline" id="modal-title">
                        {this.state.orgInfo.name}
                    </Typography>
                    <Typography variant="title" id="simple-modal-description">
                        {this.state.orgInfo.service}
                    </Typography>
                    <Typography variant="h5" id="simple-modal-description">
                        {this.props.orgInfo.orgInfo.address}
                    </Typography>
                    <Typography variant="body1" id="modal-description">
                        {this.props.orgInfo.orgInfo.description}
                    </Typography>
                    <EmployeeMenu employees={["ibro", "jake"]}/>
                    <Button onClick={this.onClick}>Close</Button>
                    <CalendarComponent props={props}/>
                </div>
            </Modal>
        );
    }
}

export default OrganizationSchedulingModal;