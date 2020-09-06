import React, { useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
const Loading = dynamic(() => import("../form/Loading"), { ssr: false });
import userStyle from "./Pages.module.css";
import { connect } from "react-redux";
import { getUserList } from "../../../../redux/action/getUsersActions";
import { CheckIsEmpty } from "../../../library/FuncCheckEmpty";
import moment from "moment";
import { MDBDataTable, MDBBtn } from "mdbreact";

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

    const funcReactDataTable = () => {
      const dataUserList = () => {
        let dataUsersList = [];
        if (CheckIsEmpty(data)) {
          data.map((v, k) => {
            dataUsersList[k] = {
              id: v.user_id,
              username: v.user_name,
              regdate: moment(v.user_regdate).format("LLLL"),
              lastlogin: moment(v.user_last_login).format("LLLL"),
              edituser: (
                <MDBBtn className="btn btn-warning" size="sm">
                  Edit
                </MDBBtn>
              ),
              delete: (
                <MDBBtn className="btn btn-danger" size="sm">
                  Delete
                </MDBBtn>
              ),
            };
          });
        }else{
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
          <div class={`d-flex w-100 main-data ${userStyle.main_data}`}>
            <div className={`${userStyle.loading_data_center}`}>
              <Loading loading={isLoading} color="#191970" size={25} />
            </div>
          </div>
        );
      } else if (isLoading === false) {
        return (
          <React.Fragment>
            <div id="datatables-react" className="d-flex h-100 w-100">
              <MDBDataTable
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
