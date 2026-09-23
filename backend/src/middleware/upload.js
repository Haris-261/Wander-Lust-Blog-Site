import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = file.mimetype.startsWith('image/');
  if (extOk && mimeOk) cb(null, true);
  else cb(new Error('Only image files are allowed (jpeg, png, webp, gif)'));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
