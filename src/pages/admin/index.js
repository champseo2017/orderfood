import React, { Component } from "react";
import nextExpressPage from "next-express/page";
import dynamic from "next/dynamic";
const Wrapper = dynamic(
  () => import("../../component/admin/include/template/Wrapper/Wrapper"),
  { ssr: false }
);
const Sidebar = dynamic(
  () => import("../../component/admin/include/template/sidebar/Sidebar"),
  { ssr: false }
);

class Index extends Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
           <Sidebar/>
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default nextExpressPage(Index);
