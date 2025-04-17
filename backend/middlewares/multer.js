import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js'; // from the file above

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'product-images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });
export default upload;