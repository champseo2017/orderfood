require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { cloudinary } = require("../utlis/cloudinary");

exports.fileUploads = asyncHandler(async (req, res, next) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "mychamp",
    });

    return res.send({ msg: "ok upload done" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ err: "Somethign went wrong" });
  }
});
