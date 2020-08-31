import React, { useEffect } from "react";
import PageHeading from "./PageHeading";
import ContentRow from "./ContentRow";
import ContentRowUserDashBoard from "./ContentRowUserDashBoard";
import { connect } from "react-redux";
import { clearDashboardUser } from "../../../../redux/action/dashboardActions";

const ContainerContent = React.memo(({ dashboardData, clearDashboardUser,csrfToken }) => {
  useEffect(() => {
    let mount = true;
    if (mount) {
      clearDashboardUser();
    }
    return () => {
      mount = false;
    };
  }, []);
  const renderHtml = (event) => {
    const { data } = event;
    switch (data) {
      case "usersDasboard":
        return (
          <React.Fragment>
            <div className="container-fluid">
              <PageHeading name="Dashboard Users" />
              <ContentRowUserDashBoard csrfToken={csrfToken}/>
            </div>
          </React.Fragment>
        );

      default:
        return (
          <React.Fragment>
            <div className="container-fluid">
              <PageHeading />
              <ContentRow />
            </div>
          </React.Fragment>
        );
    }
  };
  return renderHtml(dashboardData);
});

const mapStateToProps = (state) => {
  return {
    dashboardData: state.dashboardReducers.dasboard,
  };
};

const mapDispatchToProps = {
  clearDashboardUser,
};

ContainerContent.defaultProps = {
  csrfToken: ''
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerContent);
