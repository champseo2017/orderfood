import React, { Component } from "react";
import axios from "axios";

class UploadMyFile extends Component {
  handleUploadFile = (event) => {
    const data = new FormData();
   
    data.append("file", event.target.files[0]);
    data.append("name", "some value user types");
    data.append("description", "some value user types");
   
    // '/files' is your node.js route that triggers our middleware
    axios.post(`${process.env.ENDPOINT}/api/filesupload`, data).then((response) => {
      console.log(response); // do something with the response
    });
  };
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleUploadFile} />
      </div>
    );
  }
}
export default UploadMyFile;
