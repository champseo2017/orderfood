import React, { useEffect } from "react";
import PageHeading from "./PageHeading";
import ContentRow from "./ContentRow";
import ContentRowUserDashBoard from "./ContentRowUserDashBoard";
import { connect } from "react-redux";

const ContainerContent = React.memo(({ dashboardData,csrfToken }) => {
  
  const renderHtml = (event) => {
    const { data } = event;
    switch (data) {
      case "usersDasboard":
        return (
          <React.Fragment>
            <div className="container-fluid">
              <PageHeading name="Dashboard Users" />
              <ContentRowUserDashBoard csrfToken={csrfToken} pageDashBoard="Dashboard Users"/>
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



ContainerContent.defaultProps = {
  csrfToken: ''
};

export default connect(mapStateToProps)(ContainerContent);
