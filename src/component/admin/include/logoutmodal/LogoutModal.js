import React from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { connect } from "react-redux";
import { clearDashboardUser } from "../../../../redux/action/dashboardActions";
const LogoutModal = React.memo(({clearDashboardUser}) => {
  const logOutAdmin = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      clearDashboardUser()
      reactLocalStorage.remove("token");
      window.location.href = "/admin/login";
    }
  };
  return (
    <div
      className="modal fade"
      id="logoutModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Ready to Leave?
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            Select "Logout" below if you are ready to end your current session.
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <a onClick={logOutAdmin} className="btn btn-primary">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

const mapDispatchToProps = {
  clearDashboardUser,
};
export default connect(null, mapDispatchToProps)(LogoutModal);
