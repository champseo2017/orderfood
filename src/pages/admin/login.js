import React, { Component } from "react";
import nextExpressPage from "next-express/page";
import dynamic from "next/dynamic";
import { LoadingPages } from "../../component/admin/include/middleware/LoadingPages";
import { CheckIsEmpty } from "../../component/library/FuncCheckEmpty";
const LoginForm = dynamic(
  () => import("../../component/admin/include/form/LoginForm"),
  { ssr: false }
);
import { adminSignIn } from "../../redux/action/pagesAdminActions";
import { connect } from "react-redux";

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
    this.props.dispatch(adminSignIn(csrfToken));
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
        {data === "Bad Login Info Admin" && <LoginForm csrfToken={csrfToken} />}
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
