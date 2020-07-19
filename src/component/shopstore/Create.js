import React, { Component, Suspense } from "react";
import dynamic from "next/dynamic";

// const useImage = dynamic(
//   () => import('react-image'),
//   { ssr: false }
// )

class Create extends Component {
  render() {
    const { IMaskInput } = require("react-imask");
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="Users_email"
              name="Users_email"
              aria-describedby="emailHelp"
              placeholder="Users_email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Users_phonenumber</label>
            <IMaskInput
              mask={Number}
              name="Users_phonenumber"
              id="Users_phonenumber"
              autoComplete="off"
              className={`form-control`}
              radix="."
              unmask={true}
              mask="000-000-0000"
              onAccept={(value, mask) => {
                console.log(value);
              }}
              placeholder="Users_phonenumber"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Users_phonenumber</label>
             
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Create;
