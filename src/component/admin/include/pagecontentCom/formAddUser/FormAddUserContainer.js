import React, { useState } from "react";
import { Formik } from "formik";
import { validateApplication } from "../../../../../validator/applicationSchema";
import FormAddUser from "./FormAddUser";
import { connect } from "react-redux";
import {addUserAdmin} from '../../../../../redux/action/addUsersAdmin/addUsersDbAction'
const FormAddUserContainer = React.memo(({addUserAdmin,dataAddUser,csrfToken}) => {
  const fieldUser = {
    user_name: "",
    user_password: "",
    user_passconfirmation: "",
    user_role: "",
    user_email:''
  };

  const initDataForm = {
    ...fieldUser,
  };

  const [submitForm, setSubmitForm] = useState(false);

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
            const {user_name, user_password, user_role,user_email} = values.addUser
            const objData = {
              user_name:user_name,
              user_password:user_password,
              user_role:user_role,
              csrf:csrfToken,
              user_email:user_email
            }
            addUserAdmin(objData)
            // const setSubmit = true
            // setSubmitForm(setSubmit);
            console.log(dataAddUser)
          }
        }}
      >
        {(props) => (
          <FormAddUser
            props={props}
            appType="addUser"
            submitForm={submitForm}
          />
        )}
      </Formik>
    </React.Fragment>
  );
});

const mapStateToProps = (state) => {
  return {
    dataAddUser: state.addUserAdminReducers.addUser.data,
  };
};
const mapDispatchToProps = {
  addUserAdmin,
};
FormAddUserContainer.defaultProps = {
  addUserSuccess: "",
  addUserAdmin:'',
  csrfToken:''
};

export default connect(mapStateToProps,mapDispatchToProps)(FormAddUserContainer);