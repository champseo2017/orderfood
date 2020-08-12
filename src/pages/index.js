import React, { Component } from "react";
import stylesShop from "../component/frontend/css/Shop.module.css";
import nextExpressPage from "next-express/page";
import Head from "next/head";
import dynamic from "next/dynamic";
import { LoadingPages } from "../component/admin/include/middleware/LoadingPages";
import { CheckIsEmpty } from "../component/library/FuncCheckEmpty";
class Index extends Component {
  _isMounted = false;
  static async getInitialProps(ctx) {
    const { query } = ctx;
    if (CheckIsEmpty(query)) {
      const { csrfToken } = query._nextExpressData;
      return { csrfToken: csrfToken };
    }
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
      const {csrfToken} = this.props
      
    return (
      <React.Fragment>
        <Head>
          <title>Home</title>
        </Head>
        <div className={stylesShop.test}>hello</div>
        <a
          onClick={() => {
            window.location.href = "/admin";
          }}
        >
          Click to admin pages
        </a>
      </React.Fragment>
    );
  }
}

Index.defaultProps = {
  csrfToken: ''
};

export default LoadingPages(nextExpressPage(Index));
