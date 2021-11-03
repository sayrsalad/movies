const multer = require('multer');

const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    // console.log(file.fieldname);
    callback(null, './client/public/uploads/'+file.fieldname);
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

module.exports = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});