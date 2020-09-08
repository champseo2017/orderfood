import React from "react";
import { clickDashboardUser } from "../../../../../redux/action/dashboardActions";
import { connect } from "react-redux";

const BlackButton = React.memo(({ pagesBack, clickDashboardUser }) => {
  const clickHandleBack = (e) => {
    e.preventDefault();
    switch (pagesBack) {
      case "dashboard_users":
        return clickDashboardUser();
    }
  };
  return (
    <React.Fragment>
      <button
        type="button"
        onClick={clickHandleBack}
        class="btn btn-sm btn-primary border rounded"
      >
        Back
      </button>
    </React.Fragment>
  );
});

BlackButton.defaultProps = {
  pagesBack: "",
  clickDashboardUser: "",
};

const mapDispatchToProps = {
  clickDashboardUser,
};

export default connect(null, mapDispatchToProps)(BlackButton);
