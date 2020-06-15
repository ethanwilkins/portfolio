const multer = require('multer');

// sets destination folder and formatted name for image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    // extracts extension from file
    const extension = file.mimetype.split('/')[1];
    // uses only date and extension of original file name
    cb(null, Date.now() + '.' + extension);
  }
});

// filefilter acts as gatekeeper and allows specified file types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // 10 mb
  },
  fileFilter: fileFilter
});

module.exports = upload;