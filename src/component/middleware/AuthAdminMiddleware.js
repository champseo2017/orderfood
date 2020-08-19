import React, { Component } from "react";
import { setUpPasswordV1 } from "../../services/user.service";
import { reactLocalStorage } from "reactjs-localstorage";

export const WithAuthAdmin = (WrappedComponent) =>
  class extends Component {
    static getInitialProps = async (ctx) => {
      const { csrfToken } = ctx.query._nextExpressData;
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));
      return { ...componentProps, csrfToken: csrfToken };
    };
    constructor(props) {
      super(props);
    }

    async componentDidMount() {
      const jwtToken = await reactLocalStorage.get("token");
      const { csrfToken } = this.props;
      const url = "api/checkadminpages";
      const dataRes = await setUpPasswordV1(jwtToken, csrfToken, url);
      if (dataRes === "You are admin") {
        if (typeof window !== "undefined") {
          window.location.href = "/admin";
        }
      } else if (dataRes == "Unauthorized") {
        if (typeof window !== "undefined") {
          window.location.href = "/admin/login";
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
