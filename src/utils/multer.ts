import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';
import path from 'path';
// local upload
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    var temPath = path.join(__dirname, '../../uploads/');
    if (!existsSync(temPath)) {
      mkdirSync(temPath);
    }
    cb(null, temPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.originalname.split('.').slice(0, -1).join('.')}_${getdateTime()}${path.extname(file.originalname)}`,
    );
  },
});

export const uploadToLocal = multer({
  storage: localStorage,
});

// upload to cloudinary
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.originalname.split('.').slice(0, -1).join('.')}_${getdateTime()}${path.extname(file.originalname)}`,
    );
  },
});

export const uploadToCloud = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});
export function getdateTime(forReferral: boolean = false) {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  if (forReferral) {
    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
  }
  const dateTime = `${day}-${month}-${year}_${hours}-${minutes}-${seconds}`;
  return dateTime;
}
