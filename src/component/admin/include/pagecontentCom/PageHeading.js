import React from "react";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import moment from "moment";
import { CheckIsEmpty } from "../../../library/FuncCheckEmpty";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import FormAddUser from './formAddUser/FormAddUser'

const PageHeading = React.memo(({ name, resultDataUser }) => {
  const { data, isLoading } = resultDataUser;

  const handleClickAddUser = (e) => {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "remove-button-confirm",
        cancelButton: "btn btn-danger border rounded",
      },
      buttonsStyling: false,
    });
    return swalWithBootstrapButtons
      .fire({
        title: "<strong>เพิ่ม Users</strong>",
        html: `<form class="mb-5">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button id="submit_value" type="submit" class="btn btn-primary">Submit</button>
      </form>`,
        onBeforeOpen: () => {
          const elm = [
            ...document.querySelectorAll("button.remove-button-confirm"),
          ];
          const elmActions = [
            ...document.querySelectorAll("div.swal2-actions"),
          ];
          if (CheckIsEmpty(elm)) {
            elm[0].style.display = "none";
          }

          if (CheckIsEmpty(elmActions)) {
            elmActions[0].style.justifyContent = "flex-end";
          }

         
            
        },
        onOpen:() => {
          const selectElement = document.getElementById('submit_value');

          selectElement.addEventListener('click', (event) => {
            event.preventDefault();
             console.log(document.getElementById('exampleInputEmail1').value)
          });
        },
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        cancelButtonText: "Cancel",
        cancelButtonAriaLabel: "Cancel",
      })
      .then((result) => {
        if (result.value) {
          return true
        } else if (
          result.dismiss === swalWithBootstrapButtons.DismissReason.cancel
        ) {
          return false
        }
      });
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
          data.map((v, k) => {
            dataUser[k] = {
              userid: v.user_id,
              username: v.user_name,
              regdate: moment(v.user_regdate).format("LLLL"),
              lastlogin: moment(v.user_last_login).format("LLLL"),
            };
          });
        }

        const fileNameCsv = name.toLowerCase();
        const resultFileName = fileNameCsv.split(" ").join("-");

        return (
          <React.Fragment>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">{name}</h1>
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
      default:
        return (
          <React.Fragment>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">{name}</h1>
              <div className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"></div>
            </div>
          </React.Fragment>
        );
    }
  };
  return <React.Fragment>{renderHtml()}</React.Fragment>;
});

PageHeading.defaultProps = {
  name: "Dashboard",
  resultDataUser: "",
};

const mapStateToProps = (state) => {
  return {
    resultDataUser: state.dashboardGetUsersReducers.dataUsers,
  };
};

export default connect(mapStateToProps)(PageHeading);
