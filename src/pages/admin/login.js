import React, { Component } from "react";
import nextExpressPage from "next-express/page";
import dynamic from "next/dynamic";
import { LoadingPages } from "../../component/admin/include/middleware/LoadingPages";
import { CheckIsEmpty } from "../../component/library/FuncCheckEmpty";
const LoginForm = dynamic(
  () => import("../../component/admin/include/form/LoginForm"),
  { ssr: false }
);
import {
  adminSignIn,
  clearAdminCheck,
} from "../../redux/action/pagesAdminActions";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";

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
    const { csrfToken } = this.props;
    const tokenCheck = reactLocalStorage.get("token");

    if (CheckIsEmpty(tokenCheck)) {
      this.props.dispatch(adminSignIn(csrfToken));
    } else {
      this.props.dispatch(clearAdminCheck());
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.pagesCheckAdmin !== this.props.pagesCheckAdmin) {
      const { data } = this.props.pagesCheckAdmin;

      if (data === "You are admin") {
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
    const { csrfToken } = this.props;
    const { data } = this.props.pagesCheckAdmin;

    return (
      <React.Fragment>
        {data !== "You are admin" ? <LoginForm csrfToken={csrfToken} /> : null}
      </React.Fragment>
    );
  }
}
Login.defaultProps = {
  csrfToken: "",
};

function mapStateToProps(state) {
  return {
    pagesCheckAdmin: state.checkAdminReducers.admin,
  };
}

export default connect(mapStateToProps)(LoadingPages(nextExpressPage(Login)));
