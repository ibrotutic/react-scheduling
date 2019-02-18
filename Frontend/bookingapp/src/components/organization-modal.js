import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';

class OrgModal extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind();
        this.handleClose = this.handleClose.bind();

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    render() {
        return (
            <div>
                <Modal open={this.state.show}/>
            </div>
        );
    }
}

export default(OrgModal);