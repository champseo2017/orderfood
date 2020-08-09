const multer = require('multer');
const users = require('../controllers/Users')
const fileUploadMiddleware = require('../controllers/FileUpload');
const getImages = require('../controllers/GetImages');
const csrf = require("csurf");

module.exports = function (app) {
  const csrfProtection = csrf({ cookie: true });
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  app.post('/api/users/store', users.storeCreate)
  app.post('/api/upload',fileUploadMiddleware.fileUploads)
  app.get('/api/images',getImages.getImage)
};
