import React, { Component } from "react";
import CreateUserStyles from './StyleCreate'
import NoSSR from "react-no-ssr";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateSize, FilePondPluginFileValidateType, FilePondPluginFileEncode, FilePondPluginImageResize);
import $ from "jquery";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.server = {
      timeout: 99999,
      process: this.processHandler,
      revert: this.revertHandler
    };
  }

  componentDidMount(){
    if (typeof window !== "undefined") {
      $('#image-profile-store div').on('click', function() {
        $('#image-profile-store div').removeClass('active');
          $(this).addClass('active');
          console.log($(this));
        });
    }
  }

  onRemoveFile = file => {
    console.log("onremovefile triggered for ", file);
  };

  onProcessFile = (err, fileItem) => {
    console.log("onprocessfile");
    console.log(fileItem);
    console.log(fileItem.source);
    this.setState({
      currentFile: {
        source: fileItem.source,
        options: {
          type: "local"
        }
      }
    });
  };

  processHandler = async (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort
  ) => {
    console.log("processhandler");
    progress(true, 100, 100);
  
    load("https://i.imgur.com/bFDWhkK.jpg");

    // this.setState({
    //   currentFile: file.name
    // });
    return {
      abort: () => {
        abort();
      }
    };
  };
  
  render() {
    const {files} = this.state
    console.log(files);
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

        <div>
        <h4>Upload a file and note the error</h4>
        <FilePond
          labelIdle="Drag and drop media or <span class='filepond--label-action'> Browse </span>"
          server={this.server}
          imageResizeMode='cover'
          allowImageResize={true}
          maxFileSize="5MB"
          acceptedFileTypes={['image/png', 'image/jpeg']}
          onremovefile={this.onRemoveFile}
          onprocessfile={this.onProcessFile}
        >
          {this.state.currentFile && (
            <File src={this.state.currentFile.source} origin="local" />
          )}
        </FilePond>
        </div>

     
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <style jsx global>
        {CreateUserStyles}
      </style>
      </React.Fragment>
    )
  }
}

export default Create