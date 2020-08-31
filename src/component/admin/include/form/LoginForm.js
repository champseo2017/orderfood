import React, { PureComponent } from "react";
import { CheckIsEmpty } from "../../../library/FuncCheckEmpty";
import { connect } from "react-redux";
import { signin } from "../../../../redux/action/authActions";
import stylesLogin from "./Login.module.css";
import dynamic from "next/dynamic";
const Loading = dynamic(() => import("./Loading"), { ssr: false });
import { reactLocalStorage } from "reactjs-localstorage";

class LoginForm extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      formElements: {
        email: {
          type: "email",
          value: "",
          validator: {
            required: true,
            pattern: "email",
          },
          touched: false,
          error: {
            status: true,
            message: "",
          },
        },
        password: {
          type: "password",
          value: "",
          validator: {
            required: true,
            minLength: 8,
          },
          touched: false,
          error: {
            status: true,
            message: "",
          },
        },
      },
      csrfToken: this.props.csrfToken,
      errorEmailSubmit: "",
      errorPassSubmit: "",
      formValid: false,
      isChecked: false,
    };
    this.onFormChange = this.onFormChange.bind(this);
    this.checkValidator = this.checkValidator.bind(this);
    this.getInputClass = this.getInputClass.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    const getEmail = reactLocalStorage.get("email");
    let updateForm = {
      ...this.state.formElements,
    };
    if (CheckIsEmpty(getEmail)) {
      updateForm["email"].value = getEmail;
      updateForm["email"].error.status = false;

      this.setState({
        ...this.state,
        formElements: updateForm,
      });

      const elmCheck = document.getElementById("rememberMeCheck");

      if (CheckIsEmpty(elmCheck)) {
        elmCheck.setAttribute("checked", "checked");
      }
    }
  }
  onFormChange = (event) => {
    if (this._isMounted) {
      if (CheckIsEmpty(event)) {
        const name = event.target.name;
        const value = event.target.value;
        let updateForm = {
          ...this.state.formElements,
        };
        updateForm[name].value = value;
        updateForm[name].touched = true;
        const validatorObject = this.checkValidator(
          value,
          updateForm[name].validator
        );
        updateForm[name].error = {
          status: validatorObject.status,
          message: validatorObject.message,
        };

        let formStatus = true;
        for (let name in updateForm) {
          if (updateForm[name].validator.required === true) {
            formStatus = !updateForm[name].error.status && formStatus;
          }
        }
        const getEmail = reactLocalStorage.get("email");
        const elmCheck = document.getElementById("email-admin-form");
        this.setState({
          ...this.state,
          formElements: updateForm,
          formValid:
            getEmail || (CheckIsEmpty(elmCheck) && elmCheck.value)
              ? true
              : formStatus,
        });
      }
    }
  };

  checkValidator = (value, rule) => {
    let valid = true;
    let message = "";
    if (value.trim().length === 0 && rule.required) {
      valid = false;
      message = "จำเป็นต้องกรอก";
    }
    if (value.length < rule.minLength && valid) {
      valid = false;
      message = `มากกว่า ${rule.minLength} ตัวอักษร`;
    }
    if (rule.pattern === "email" && valid) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(value) === false) {
        valid = false;
        message = "กรอกอีเมลไม่ถูกต้อง";
      }
    }

    return {
      status: !valid,
      message: message,
    };
  };

  getInputClass = (name) => {
    if (CheckIsEmpty(name)) {
      const { formElements } = this.state;
      if (formElements[name].touched) {
        const elementErrorStatus = this.state.formElements[name].error.status;
        if (elementErrorStatus) {
          return "is-invalid";
        } else {
          return "is-valid";
        }
      }
    }
  };

  getErrorMessage = (name) => {
    if (CheckIsEmpty(name)) {
      const { formElements } = this.state;
      if (CheckIsEmpty(formElements[name].error.message)) {
        return formElements[name].error.message;
      }
    }
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    const { formElements } = this.state;
    const formData = {};
    for (let name in formElements) {
      formData[name] = formElements[name].value;
    }

    if (this._isMounted) {
      if (
        !CheckIsEmpty(formData.email) &&
        formElements.email.touched !== true
      ) {
        const setErrorEmail = {
          errorEmailSubmit: "จำเป็นต้องกรอก Email",
        };
        this.setState({
          ...setErrorEmail,
        });
      } else {
        const setErrorEmail = {
          errorEmailSubmit: "",
        };
        this.setState({
          ...setErrorEmail,
        });
      }

      if (
        !CheckIsEmpty(formData.password) &&
        formElements.password.touched !== true
      ) {
        const setErrorPass = {
          errorPassSubmit: "จำเป็นต้องกรอก Password",
        };
        this.setState({
          ...setErrorPass,
        });
      } else {
        const setErrorPass = {
          errorPassSubmit: "",
        };
        this.setState({
          ...setErrorPass,
        });
      }

      if (CheckIsEmpty(formData.email) && CheckIsEmpty(formData.password)) {
        const { email, password } = formData;
        const { csrfToken, formValid } = this.state;

        if (
          formValid &&
          formElements.password.error.status !== true &&
          formElements.email.error.status !== true
        ) {
          this.props.dispatch(signin(email, password, csrfToken));
        }
      }
    }
  };

  onChangeCheckbox = (event) => {
    const { email } = this.state.formElements;

    const emailElm = [...document.querySelectorAll("input#email-admin-form")];

    if (event.target.checked === true) {
      if (email.error.status !== true) {
        const email = emailElm[0].value;
        reactLocalStorage.set("email", email);
      } else {
        reactLocalStorage.remove("email");
      }
    } else {
      reactLocalStorage.remove("email");
      const elmCheck = document.getElementById("email-admin-form");
      let updateForm = {
        ...this.state.formElements,
      };
      if (CheckIsEmpty(elmCheck)) {
        updateForm["email"].value = elmCheck.value;
        updateForm["email"].error.status = false;
        this.setState({
          ...this.state,
          formElements: updateForm,
        });
      }
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataAdmin !== this.props.dataAdmin) {
      const { data } = this.props.dataAdmin;
      if (CheckIsEmpty(data) && data !== "Bad Login Info") {
        if (typeof window !== "undefined") {
          window.location.href = "/admin";
        }
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const {
      errorEmailSubmit,
      errorPassSubmit,
      formElements,
      isChecked,
    } = this.state;
    const { isLoading, data } = this.props.dataAdmin;

    return (
      <React.Fragment>
        <div className="container">
          <div
            className="row justify-content-center"
            style={{
              height: "100vh",
            }}
          >
            <div className="col-xl-10 col-lg-12 col-md-9 align-self-center">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          {CheckIsEmpty(data) && data === "Bad Login Info" && (
                            <div className="alert alert-danger" role="alert">
                              Something went wrong
                            </div>
                          )}
                          {CheckIsEmpty(errorEmailSubmit) && (
                            <div className="alert alert-danger" role="alert">
                              {errorEmailSubmit}
                            </div>
                          )}

                          {CheckIsEmpty(errorPassSubmit) && (
                            <div className="alert alert-danger" role="alert">
                              {errorPassSubmit}
                            </div>
                          )}

                          <h1 className="h4 text-gray-900 mb-4">Login</h1>
                        </div>
                        <form className="user" onSubmit={this.onFormSubmit}>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              id="email-admin-form"
                              value={formElements.email.value}
                              onChange={this.onFormChange}
                              className={`form-control form-control-user ${this.getInputClass(
                                "email"
                              )}`}
                              autoComplete="off"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                            />
                            {CheckIsEmpty(this.getErrorMessage("email")) && (
                              <div className="invalid-feedback">
                                {this.getErrorMessage("email")}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              name="password"
                              value={formElements.password.value}
                              onChange={this.onFormChange}
                              className={`form-control form-control-user ${this.getInputClass(
                                "password"
                              )}`}
                              id="exampleInputPassword"
                              placeholder="Password"
                            />
                            {CheckIsEmpty(this.getErrorMessage("password")) && (
                              <div className="invalid-feedback">
                                {this.getErrorMessage("password")}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="rememberMeCheck"
                                onChange={this.onChangeCheckbox}
                              />
                              <label
                                className="custom-control-label"
                                for="rememberMeCheck"
                              >
                                Remember Me
                              </label>
                            </div>
                            <div className={stylesLogin.container_main}>
                              <button
                                type="submit"
                                class="btn btn-primary btn-user btn-block"
                              >
                                Login
                              </button>
                              <div className={stylesLogin.center}>
                                <Loading loading={isLoading} />
                              </div>
                            </div>
                            <hr />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

LoginForm.defaultProps = {
  csrfToken: "",
};

function mapStateToProps(state) {
  return {
    dataAdmin: state.authReducers.admin,
  };
}

export default connect(mapStateToProps)(LoginForm);
