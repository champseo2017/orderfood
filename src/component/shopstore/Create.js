import React, { useEffect } from "react";
import createUserStyles from './styleCreate'
import NoSSR from "react-no-ssr";
import $ from "jquery";

const Create = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      $('#image-profile-store div').on('click', function() {
        $('#image-profile-store div').removeClass('active');
          $(this).addClass('active');
        });
    }
  }, []);
  const renderInputPhone = () => {
    if (typeof window !== "undefined") {
      const { IMaskInput } = require("react-imask");
      return (
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
      );
    }
  };
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
          <NoSSR>{renderInputPhone()}</NoSSR>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password1</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password1"
            placeholder="Password1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password2</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            placeholder="Password2"
          />
        </div>

        <div
          id="image-profile-store"
          style={{
            maxWidth: "55%",
          }}
          className="d-flex justify-content-center bd-highlight mb-3 w-100 flex-wrap"
        >
          <div className="p-2">
            <img
              className="rounded-circle"
              src="https://via.placeholder.com/120"
              alt="Card image cap"
            />
          </div>
          <div className="p-2">
            <img
              className="rounded-circle"
              src="https://via.placeholder.com/120"
              alt="Card image cap"
            />
          </div>
          <div className="p-2">
            <img
              className="rounded-circle"
              src="https://via.placeholder.com/120"
              alt="Card image cap"
            />
          </div>
          <div className="p-2">
            <img
              className="rounded-circle"
              src="https://via.placeholder.com/120"
              alt="Card image cap"
            />
          </div>
          <div className="p-2">
            <img
              className="rounded-circle"
              src="https://via.placeholder.com/120"
              alt="Card image cap"
            />
          </div>
          <div className="p-2">
            <img
              className="rounded-circle"
              src="https://via.placeholder.com/120"
              alt="Card image cap"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <style jsx global>
        {createUserStyles}
      </style>
     
    </React.Fragment>
  );
};

export default Create;
