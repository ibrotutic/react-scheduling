import React from "react";
import connect from "react-redux/es/connect/connect";
import OrganizationSchedulingModal from "./modals/organization-scheduling-modal";
import OrganizationCreationModal from "./modals/organization-creation-modal";
import LoginModal from "./modals/login-modal";
import SignUpModal from "./modals/sign-up-modal";
import notificationModal from "./modals/notification-modal";

const MODAL_COMPONENTS = {
  ORG_SELECT: OrganizationSchedulingModal,
  ORG_CREATE: OrganizationCreationModal,
  LOGIN: LoginModal,
  SIGN_UP: SignUpModal,
  NOTIFICATION: notificationModal
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

    if (this.props.open) {
      return <SpecificModal props={props} />;
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => {
      dispatch({
        type: "HIDE_MODAL"
      });
    }
  };
};

function mapStateToProps(state) {
  return {
    modalType: state.modal.modalType,
    open: state.modal.open
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalRoot);
