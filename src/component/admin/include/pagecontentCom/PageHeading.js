import React from "react";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import moment from "moment";
import { CheckIsEmpty } from "../../../library/FuncCheckEmpty";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { clickAddUserDashboardUser } from "../../../../redux/action/dashboardActions";
import BlackButton from "./blackButton/BlackButton";

const PageHeading = React.memo(
  ({ name, resultDataUser, clickAddUserDashboardUser, titleHead }) => {
    const { data, isLoading } = resultDataUser;

    const handleClickAddUser = (e) => {
      e.preventDefault();
      console.log(e)
      clickAddUserDashboardUser();
     
    };

    const renderHtml = () => {
      switch (name) {
        case "Dashboard Users":
          const headers = [
            { label: "User id", key: "userid" },
            { label: "User Name", key: "username" },
            { label: "Register Date", key: "regdate" },
            { label: "Last login", key: "lastlogin" },
          ];

          const dataUser = [];

          if (CheckIsEmpty(data) && data) {
            try {
              data.map((v, k) => {
                const checkLastLogin = moment(v.user_last_login);
                const { _isValid } = checkLastLogin;
                const regDate = moment(v.user_regdate).toDate()
                const lastLogin = _isValid
                  ? moment(v.user_last_login).toDate()
                  : "Wait update";
                dataUser[k] = {
                  userid: v.user_id,
                  username: v.user_name,
                  regdate: regDate,
                  lastlogin: lastLogin,
                };
              });
            } catch (error) {}
          }

          const fileNameCsv = name.toLowerCase();
          const resultFileName = fileNameCsv.split(" ").join("-");

          return (
            <React.Fragment>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h1 className="h3 mb-0 text-gray-800">{name}</h1>
                </div>
                <div className="d-none d-inline-block">
                  {isLoading === false && (
                    <button
                      onClick={handleClickAddUser}
                      type="button"
                      class="btn btn-sm btn-success"
                    >
                      Add User
                    </button>
                  )}
                </div>
                {isLoading === false && (
                  <div className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <i className="fas fa-download fa-sm"></i>
                    <CSVLink
                      className="text-light p-2 remove_underline w-100"
                      filename={`${resultFileName}.csv`}
                      data={dataUser}
                      headers={headers}
                    >
                      Download CSV
                    </CSVLink>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        case "add users":
          return (
            <React.Fragment>
              <div className="d-flex align-items-center mb-4">
                <div className="mr-3">
                  <BlackButton pagesBack="dashboard_users" />
                </div>
                <div>
                  <h1 className="h3 mb-0 text-gray-800">{titleHead}</h1>
                </div>
              </div>
            </React.Fragment>
          );

        default:
          return (
            <React.Fragment>
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">{name}</h1>
              </div>
            </React.Fragment>
          );
      }
    };
    return <React.Fragment>{renderHtml()}</React.Fragment>;
  }
);

PageHeading.defaultProps = {
  name: "Dashboard",
  resultDataUser: "",
  clickAddUserDashboardUser: "",
  titleHead: ""
};

const mapDispatchToProps = {
  clickAddUserDashboardUser
};

const mapStateToProps = (state) => {
  return {
    resultDataUser: state.dashboardGetUsersReducers.dataUsers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeading);
