import React, { Component } from "react";
import Link from "next/link";
import nextExpressPage from "next-express/page";
import { connect } from 'react-redux';
import { clearCreateUser } from '../redux/action/testUserActions';

class Home extends Component {
  componentDidMount(){
    this.props.dispatch(clearCreateUser());
  }
  render() {
    console.log(this.props.testRedux);
    return (
      <React.Fragment>
          <p>Hello</p>
      </React.Fragment>
    );
  }
}

Home.getInitialProps = async (ctx) => {
  const {statusCode} = ctx.query._nextExpressData
  console.log(statusCode);
   return {page:''}
}

function mapStateToProps(state) {
  return {
    testRedux: state.testReducers.users,
  };
}

export default connect(mapStateToProps)(nextExpressPage(Home));