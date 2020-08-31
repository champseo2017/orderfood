import React from "react";
import dynamic from "next/dynamic";
const Loading = dynamic(() => import("../form/Loading"), { ssr: false });
import stylesLogin from "../form/Login.module.css";
import { connect } from "react-redux";

const ContentRowUserDashBoard = React.memo(({csrfToken}) => {
  const tokenCsrf = csrfToken
  return (
    <React.Fragment>
      <div className="row">
          hello
      </div>
    </React.Fragment>
  );
});



export default connect()(ContentRowUserDashBoard);