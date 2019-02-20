import React from "react";
import connect from "react-redux/es/connect/connect";
import OrganizationSchedulingModal from "./modals/organization-scheduling-modal";
import OrganizationCreationModal from "./modals/organization-creation-modal"
import LoginModal from "./modals/login-modal"

const MODAL_COMPONENTS = {
    'ORG_SELECT': OrganizationSchedulingModal,
    'ORG_CREATE': OrganizationCreationModal,
    'LOGIN': LoginModal
    /* other modals */
};

class ModalRoot extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.hideModal();
    }

    render() {
        let props = {
            onClick: this.onClick
        };

        let modalType = this.props.modalType;
        let SpecificModal = MODAL_COMPONENTS[modalType];

        if(this.props.open) {
            return (
                <SpecificModal props={props}/>
            )
        }
        return null;
    }
}

function closeModal() {
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
        modalType: state.modal.modalType,
        open: state.modal.open
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);