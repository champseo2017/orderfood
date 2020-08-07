import React, { Component } from "react";
import stylesShop from '../component/frontend/css/Shop.module.css'
import nextExpressPage from "next-express/page";

class index extends Component {
  render() {
    return (
      <div className={stylesShop.test}>
          hello
      </div>
    )
  }
}

export default nextExpressPage(index);