import React, { Component } from "react";
import nextExpressPage from "next-express/page";
import { LoadingPages } from "../../component/admin/include/middleware/LoadingPages";
import { CheckIsEmpty } from "../../component/library/FuncCheckEmpty";
class Login extends Component {
  _isMounted = false;
  static async getInitialProps(ctx) {
    const { query } = ctx;
    if (CheckIsEmpty(query)) {
      const { csrfToken } = query._nextExpressData;
      return { csrfToken: csrfToken };
    }
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row justify-content-center" style={{
            height:'100vh'
          }}>
            <div className="col-xl-10 col-lg-12 col-md-9 align-self-center">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form className="user">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                            />
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck"
                              >
                                Remember Me
                              </label>
                            </div>
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
Login.defaultProps = {
  csrfToken: "",
};

export default LoadingPages(nextExpressPage(Login));
