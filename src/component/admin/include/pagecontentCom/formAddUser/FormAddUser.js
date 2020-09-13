import React, { useState, useEffect } from "react";
import "./formStyleAddUser.scss";
import Select from "react-select";
import BlackButton from "../blackButton/BlackButton";
import { CheckIsEmpty } from "../../../../library/FuncCheckEmpty";
import { isMobile } from 'mobile-device-detect';
import { clickDashboardUser } from "../../../../../redux/action/dashboardActions";
import { connect } from "react-redux";

const FormAddUser = React.memo(({ props, appType,clickDashboardUser,submitForm}) => {

  const options = [
    { value: "customer", label: "Customer" },
    { value: "guest", label: "Guest" },
    { value: "admin", label: "Admin" },
  ];
  const handleSelectRole = (e) => {
    const { setFieldValue } = props;
    if (CheckIsEmpty(e)) {
      const { value } = e;
      setFieldValue(`${appType}.user_role`, value);
    } else {
      setFieldValue(`${appType}.user_role`, "");
    }
  };
  const errorReturn = () => {
    const { errors } = props;
    if (CheckIsEmpty(errors)) {
      const result = errors.addUser;
      return result;
    }
  };
  const errorCheck = errorReturn();

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShownConfirm, setPasswordShownConfirm] = useState(false);

  const handleClickPass = (e) => {
    if (CheckIsEmpty(e)) {
      setPasswordShown(passwordShown ? false : true);
    }
  };

  const handleClickPassConfirm = (e) => {
    if (CheckIsEmpty(e)) {
      setPasswordShownConfirm(passwordShownConfirm ? false : true);
    }
  };

  const handleCancelAddUser = (e) => {
    if (CheckIsEmpty(e)) {
      clickDashboardUser()
    }
  }

  return (
    <React.Fragment>
      <div class="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <form
              onSubmit={props.handleSubmit}
              className="form_user_style border border-dark m-auto rounded custome-adduser-style w-50"
            >
              <div className="form-group">
                <label>Email</label>
                <div className="input-group" id={`${appType}.user_email`}>
                  <input
                    type="email"
                    onChange={props.handleChange}
                    name={`${appType}.user_email`}
                    className={`form-control ${
                      CheckIsEmpty(errorCheck) && errorCheck.user_email
                        ? "is-invalid"
                        : CheckIsEmpty(props.touched) ? "is-valid" : ""
                    }`}
                    id="add_user_email"
                    placeholder="Email"
                    autoComplete="off"
                  />
                </div>
                {CheckIsEmpty(errorCheck) && errorCheck.user_email ? (
                  <div>
                    <small className="text-danger">
                      {errorCheck.user_email}
                    </small>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label>UserName</label>
                <div className="input-group" id={`${appType}.user_name`}>
                  <input
                    type="text"
                    onChange={props.handleChange}
                    name={`${appType}.user_name`}
                    className={`form-control ${
                      CheckIsEmpty(errorCheck) && errorCheck.user_name
                        ? "is-invalid"
                        : CheckIsEmpty(props.touched) ? "is-valid" : ""
                    }`}
                    id="add_user_name"
                    placeholder="User Name"
                    autoComplete="off"
                  />
                </div>
                {CheckIsEmpty(errorCheck) && errorCheck.user_name ? (
                  <div>
                    <small className="text-danger">
                      {errorCheck.user_name}
                    </small>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-group" id={`${appType}.user_name`}>
                  <input
                    type={passwordShown ? "text" : "password"}
                    onChange={props.handleChange}
                    name={`${appType}.user_password`}
                    className={`form-control ${
                      CheckIsEmpty(errorCheck) && errorCheck.user_password
                        ? "is-invalid"
                        : CheckIsEmpty(props.touched) ? "is-valid": ""
                    }`}
                    id="add_user_password"
                    placeholder="Password"
                    autoComplete="off"
                  />
                  <div
                    class="input-group-addon rounded-right rounded-right border pt-2 pb-1 show_hide_pass"
                    onClick={handleClickPass}
                  >
                    <i
                      class={`${
                        passwordShown ? "fa fa-eye-slash" : "fa fa-eye"
                      }`}
                    />
                  </div>
                </div>
                {CheckIsEmpty(errorCheck) && errorCheck.user_password ? (
                  <div>
                    <small className="text-danger">
                      {errorCheck.user_password}
                    </small>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-group" id={`${appType}.user_name`}>
                  <input
                    type={passwordShownConfirm ? "text" : "password"}
                    onChange={props.handleChange}
                    name={`${appType}.user_passconfirmation`}
                    className={`form-control ${
                      CheckIsEmpty(errorCheck) &&
                      errorCheck.user_passconfirmation
                        ? "is-invalid"
                        : CheckIsEmpty(props.touched) ? "is-valid" : ""
                    }`}
                    id="add_user_confirmpassword"
                    placeholder="Confirm Password"
                    autoComplete="off"
                  />
                  <div
                    class="input-group-addon rounded-right rounded-right border pt-2 pb-1 show_hide_pass"
                    onClick={handleClickPassConfirm}
                  >
                    <i
                      class={`${
                        passwordShownConfirm ? "fa fa-eye-slash" : "fa fa-eye"
                      }`}
                    />
                  </div>
                </div>
                {CheckIsEmpty(errorCheck) &&
                errorCheck.user_passconfirmation ? (
                  <div>
                    <small className="text-danger">
                      {errorCheck.user_passconfirmation}
                    </small>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label>User Role</label>
                <div className="input-group w-100" id={`${appType}.user_name`}>
                  <Select
                    onChange={handleSelectRole}
                    options={options}
                    placeholder="Select User Role"
                    isClearable
                    name={`${appType}.user_role`}
                  />
                </div>

                {CheckIsEmpty(errorCheck) && errorCheck.user_role ? (
                  <div>
                    <small className="text-danger">
                      {errorCheck.user_role}
                    </small>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="d-flex justify-content-end w-100">
                <button type="button" className="btn btn-warning mr-3" onClick={handleCancelAddUser}>
                  ยกเลิก
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitForm === true ? 'true':''}>
                  ยืนยัน
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isMobile ? <div className="d-flex justify-content-start mt-3 mb-3">
        <BlackButton pagesBack="dashboard_users" />
      </div>:''}
    </React.Fragment>
  );
});

FormAddUser.defaultProps = {
  props: "",
  appType: "",
  clickDashboardUser:'',
  submitForm:'',
  setSubmitForm:''
};

const mapDispatchToProps = {
  clickDashboardUser,
};

export default connect(null, mapDispatchToProps)(FormAddUser);