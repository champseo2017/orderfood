import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { validateApplication } from "../../../../../validator/applicationSchema";
import FormAddUser from "./FormAddUser";
import { connect } from "react-redux";
import {
  addUserAdmin,
  clearAddUserAdmin,
} from "../../../../../redux/action/addUsersAdmin/addUsersDbAction";
import { CheckIsEmpty } from "../../../../library/FuncCheckEmpty";
import { clickDashboardUser } from "../../../../../redux/action/dashboardActions";
const FormAddUserContainer = React.memo(
  ({
    addUserAdmin,
    dataAddUser,
    csrfToken,
    clickDashboardUser,
    clearAddUserAdmin,
  }) => {
    const fieldUser = {
      user_name: "",
      user_password: "",
      user_passconfirmation: "",
      user_role: "",
      user_email: "",
    };

    const initDataForm = {
      ...fieldUser,
    };

    const [submitForm, setSubmitForm] = useState(false);
    
    useEffect(() => {
      let mount = true;
      if (mount) {
        if (CheckIsEmpty(dataAddUser.data)) {
          if (dataAddUser.data.error) {
            const setSubmit = false;
            setSubmitForm(setSubmit);
          } else if (dataAddUser.data.message === "Success") {
            const setSubmit = true;
            setSubmitForm(setSubmit);
            clearAddUserAdmin();
            clickDashboardUser();
          }
        }
      }
      return () => (mount = false);
    }, [dataAddUser]);

    return (
      <React.Fragment>
        <Formik
          initialValues={{ addUser: initDataForm }}
          validationSchema={() => {
            return validateApplication;
          }}
          validateOnChange={false}
          onSubmit={(values) => {
            if (values) {
              const {
                user_name,
                user_password,
                user_role,
                user_email,
              } = values.addUser;

              const objData = {
                user_name: user_name,
                user_password: user_password,
                user_role: user_role,
                csrf: csrfToken,
                user_email: user_email,
              };
              const setSubmit = true;
              setSubmitForm(setSubmit);

              addUserAdmin(objData);
            }
          }}
        >
          {(props) => (
            <FormAddUser
              props={props}
              appType="addUser"
              submitForm={submitForm}
              dataAddUser={dataAddUser}
            />
          )}
        </Formik>
      </React.Fragment>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    dataAddUser: state.addUserAdminReducers.addUser,
  };
};
const mapDispatchToProps = {
  addUserAdmin,
  clickDashboardUser,
  clearAddUserAdmin,
};
FormAddUserContainer.defaultProps = {
  addUserSuccess: "",
  addUserAdmin: "",
  csrfToken: "",
  clickDashboardUser: "",
  clearDashboardUser: "",
  clearAddUserAdmin: "",
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormAddUserContainer);
