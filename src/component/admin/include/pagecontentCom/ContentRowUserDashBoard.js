import React, { useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
const Loading = dynamic(() => import("../form/Loading"), { ssr: false });
import { connect } from "react-redux";
import { getUserList } from "../../../../redux/action/getUsersActions";
import { CheckIsEmpty } from "../../../library/FuncCheckEmpty";
import moment from "moment";
import { MDBDataTable, MDBBtn } from "mdbreact";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
// import 'animate.css/animate.min.css';
import "./customerDatatable.scss";
import "./pages.scss";

const ContentRowUserDashBoard = React.memo(
  ({ csrfToken, pageDashBoard, getUserList, resultDataUser }) => {
    const tokenCsrf = csrfToken;
    useEffect(() => {
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

    const userManagement = (id, stringValue) => {
     
      switch (stringValue) {
        case "case_edit":
          return Swal.fire({
            title: "<strong>HTML <u>example</u></strong>",
            icon: "info",
            html:
              "You can Edit use <b>bold text</b>, " +
              '<a href="//sweetalert2.github.io">links</a> ' +
              "and other HTML tags",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: "Thumbs down",
          });
        case "case_delete":
          return Swal.fire({
            title: "<strong>HTML <u>example</u></strong>",
            icon: "info",
            html:
              "You can Delete use <b>bold text</b>, " +
              '<a href="//sweetalert2.github.io">links</a> ' +
              "and other HTML tags",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: "Thumbs down",
          });
      }
    };

    const funcReactDataTable = () => {
      const dataUserList = () => {
        let dataUsersList = [];
        if (CheckIsEmpty(data)) {
          try {
            data.map((v, k) => {
              dataUsersList[k] = {
                id: v.user_id,
                username: v.user_name,
                regdate: moment(v.user_regdate).format("LLLL"),
                lastlogin: moment(v.user_last_login).format("LLLL"),
                edituser: (
                  <MDBBtn
                    onClick={(e) => {
                      e.preventDefault();
                      userManagement(v.user_id, "case_edit");
                    }}
                    className="btn btn-warning"
                    size="sm"
                  >
                    Edit
                  </MDBBtn>
                ),
                delete: (
                  <MDBBtn
                    onClick={(e) => {
                      e.preventDefault();
                      userManagement(v.user_id, "case_delete");
                    }}
                    className="btn btn-danger"
                    size="sm"
                  >
                    Delete
                  </MDBBtn>
                ),
              };
            });
          } catch (error) {}
        } else {
          dataUsersList = [];
        }

        return {
          columns: [
            {
              label: "User id ",
              field: "id",
              sort: "disabled",
              width: 150,
            },
            {
              label: "User Name",
              field: "username",
              sort: "desc",
              width: 270,
            },
            {
              label: "Register Date",
              field: "regdate",
              sort: "disabled",
              width: 200,
            },
            {
              label: "Last login",
              field: "lastlogin",
              sort: "disabled",
              width: 100,
            },
            {
              label: "Edit User",
              field: "edituser",
              sort: "disabled",
              width: 100,
            },
            {
              label: "Delete",
              field: "delete",
              sort: "disabled",
              width: 100,
            },
          ],
          rows: dataUsersList,
        };
      };

      if (isLoading === true) {
        return (
          <div className={`d-flex w-100 main-data main_data`}>
            <div className={`loading_data_center`}>
              <Loading loading={isLoading} color="#191970" size={25} />
            </div>
          </div>
        );
      } else if (isLoading === false) {
        return (
          <React.Fragment>
            <div id="datatables-react" className="d-flex h-100 w-100">
              <MDBDataTable
                responsive
                striped
                bordered
                small
                data={dataUserList()}
                order={["username", "desc"]}
              />
            </div>
          </React.Fragment>
        );
      }
    };

    return (
      <React.Fragment>
        <div className="row">
          {renderLoadingData()}
          {funcReactDataTable()}
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
