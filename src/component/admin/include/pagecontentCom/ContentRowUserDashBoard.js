import React, { useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
const Loading = dynamic(() => import("../form/Loading"), { ssr: false });
import userStyle from "./Pages.module.css";
import { connect } from "react-redux";
import { getUserList } from "../../../../redux/action/getUsersActions";
import { CheckIsEmpty } from "../../../library/FuncCheckEmpty";
import moment from "moment";

const ContentRowUserDashBoard = React.memo(
  ({ csrfToken, pageDashBoard, getUserList, resultDataUser }) => {
    const tokenCsrf = csrfToken;
    useEffect(() => {
      const { data, isLoading, isRejected } = resultDataUser;

      let mount = true;
      if (mount) {
        if (pageDashBoard === "Dashboard Users") {
          getUserList();
        }
      }

      return () => {
        mount = false;
      };
    }, [pageDashBoard]);

    const { data, isLoading, isRejected } = resultDataUser;

    const renderLoadingData = () => {
      if (isRejected) {
        return <p>Server has a problem</p>;
      }
    };

    const renderDataResult = (data) => {
      console.log(data);
      if (CheckIsEmpty(data)) {
        return data.map((i, k) => {
          return `<tr key=${k}>
          <td>${k + 1}</td> 
      <td>${i.user_name}</td> 
      <td>${moment(i.user_regdate).format("LLLL")}</td>
      <td>${moment(i.user_last_login).format("LLLL")}</td>
      <td>Edit</td>
      <td>Delete</td>
    </tr>`;
        });
      }
    };

    const funcRenderDataTable = useCallback(() => {
      if (isLoading === false) {
        if (typeof window !== "undefined") {
          $(document).ready(function () {
            $(
              "div#data_Users_List"
            ).html(`<table id="dataUsersList" class="display" style="width:100%" cellspacing="0">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>User Name</th>
                  <th>Register Date</th>
                  <th>Last login</th>
                  <th>Edit User</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
               ${renderDataResult(data)}
              </tbody>
            </table>`);

            $("#dataUsersList").DataTable({'scrollX': true });
          });
        }
      }
    }, [isLoading]);

    return (
      <React.Fragment>
        <div className="row">
          {renderLoadingData()}

          {isLoading === true ? (
            <div class={`d-flex w-100 main-data ${userStyle.main_data}`}>
              <div className={`${userStyle.loading_data_center}`}>
                <Loading loading={isLoading} color="#191970" size={25} />
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div id="data_Users_List" className="d-flex h-100 w-100"></div>
              {funcRenderDataTable()}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    resultDataUser: state.dashboardGetUsersReducers.dataUsers,
  };
};
const mapDispatchToProps = {
  getUserList,
};
ContentRowUserDashBoard.defaultProps = {
  pageDashBoard: "",
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentRowUserDashBoard);
