import React, { Component } from "react";

class Users extends Component {
  render() {
    return <div>hello</div>;
  }
}

Users.getInitialProps = async (ctx) => {
  console.log(ctx);
  return { page: "" };
};

export default Users;
