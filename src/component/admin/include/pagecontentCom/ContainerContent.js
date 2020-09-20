import React, { useEffect } from "react";
import PageHeading from "./PageHeading";
import ContentRow from "./ContentRow";
import ContentRowUserDashBoard from "./ContentRowUserDashBoard";
import { connect } from "react-redux";
import PageAddUser from './addUser/PageAddUser'
import { CheckIsEmpty } from "../../../library/FuncCheckEmpty";

const ContainerContent = React.memo(({ dashboardData,csrfToken }) => {

  const renderHtml = (event) => {
    let data = ''
    if(CheckIsEmpty(event.dasboard.data)){
      data = event.dasboard.data
    }else if(CheckIsEmpty(event.dasboardUser.data)){
      data = event.dasboardUser.data
    }
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

        case "addUsersDasboard":
        return (
          <React.Fragment>
            <div className="container-fluid">
              <PageHeading name="add users" titleHead="เพิ่ม Users"/>
              <PageAddUser csrfToken={csrfToken}/>
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
    dashboardData: state.dashboardReducers,
  };
};



ContainerContent.defaultProps = {
  csrfToken: ''
};

export default connect(mapStateToProps)(ContainerContent);
