const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'bpkvaquy',
  api_key: 623476912522625, 
  api_secret: 'DbII9x-MzwVabMHXYr43H-Ng4ZE'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'espetinho-miranda',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

module.exports = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});