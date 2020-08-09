import React, { Component } from "react";
import stylesShop from "../component/frontend/css/Shop.module.css";
import nextExpressPage from "next-express/page";
import Head from "next/head";

class index extends Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Home</title>
        </Head>
        <div className={stylesShop.test}>hello</div>
      </React.Fragment>
    );
  }
}

export default nextExpressPage(index);