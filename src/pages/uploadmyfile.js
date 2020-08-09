import React, { Component } from "react";
import { Image } from "cloudinary-react";

class UploadMyFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileInputState: "",
      selectedFile: "",
      previewSource: "",
      imageIds: "",
    };
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.previewFile = this.previewFile.bind(this);
    this.handleSubmitFile = this.handleSubmitFile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.loadImages = this.loadImages.bind(this);
  }
  handleFileInputChange = (e) => {
    const file = e.target.files[0];
    this.previewFile(file);
  };
  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const setPreviewSource = {
        previewSource: reader.result,
      };
      this.setState({
        ...setPreviewSource,
      });
    };
  };
  handleSubmitFile = (e) => {
    const { selectedFile, previewSource } = this.state;
    e.preventDefault();
    if (!previewSource) return;
    this.uploadImage(previewSource);
  };
  uploadImage = async (base64EncodeImage) => {
    try {
      await fetch(`${process.env.ENDPOINT}/api/upload`, {
        method: "POST",
        body: JSON.stringify({
          data: base64EncodeImage,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  loadImages = async () => {
    try {
      const res = await fetch(`${process.env.ENDPOINT}/api/images`);
      const data = await res.json();
      
      const dataRes = {
        imageIds: data,
      };
      this.setState({
        ...dataRes,
      });
    } catch (error) {
      console.error(error);
    }
  };
  componentDidMount() {
    this.loadImages();
  }
  render() {
    const { fileInputState, previewSource, imageIds } = this.state;
    return (
      <div>
        <h1>Upload</h1>
        <form onSubmit={this.handleSubmitFile}>
          <input
            type="file"
            name="image"
            onChange={this.handleFileInputChange}
            value={fileInputState}
            className="form-input"
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
        {previewSource && (
          <img
            src={previewSource}
            alt="chosen"
            style={{
              height: "300px",
            }}
          />
        )}

        {imageIds &&
          imageIds.map((imageId, index) => (
            <Image
              key={index}
              cloudName="boomgt123"
              publicId={imageId}
              width="300"
              crop="scale"
            />
          ))}
      </div>
    );
  }
}

export default UploadMyFile;
