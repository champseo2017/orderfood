require("dotenv").config();
const asyncHandler = require("express-async-handler");
const axios = require('axios');
const cloudinary = require('cloudinary');

exports.fileUploads = asyncHandler(async (req, res, next) => {
    
    cloudinary.uploader.upload_stream((result) => {
        axios({
          url: `https://api.cloudinary.com/v1_1/boomgt/image/upload`, //API endpoint that needs file URL from CDN
          method: 'post',
          data: {
            url: result.secure_url,
            name: req.body.name,
            description: req.body.description
          },
        }).then((response) => {
          res.status(200).json(response.data.data);
        }).catch((error) => {
          res.status(500).json(error.response.data);
        });
      }).end(req.file.buffer);

})