import { v2 as cloudinary } from 'cloudinary';
import { CLOUDNAME, API_KEY, API_SECRET } from '../config';
import { Identifier } from '../interface/file-upload.interface';
import { consoleLog } from './common';
cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});
export const uploadToCloudinary = (filePath: string, identifier: Identifier, contactInfo: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: identifier,
        resource_type: 'auto', // Automatically detect the type of the asset
        chunk_size: 6000000, // Set chunk size for large files (6MB)
        timeout: 60000, // Timeout after 60 seconds
        folder: `workisy/${contactInfo?.replace(/[@\-_.+]/g, '')}`,
      });
      consoleLog(result);
      resolve(result.secure_url);
    } catch (error) {
      reject(new Error('File Upload Failed'));
    }
  });
};
export const deleteFromCloudinary = (identifier: Identifier, contactInfo: string) => {
  const url = `workisy/${contactInfo?.replace(/[@\-_.+]/g, '')}/${identifier}`;
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.api.delete_resources([url]);
      if (result?.deleted[url] == 'deleted') {
        return resolve(result);
      }
      return reject(new Error('File deletion failed'));
    } catch (error) {
      reject(new Error('File deletion failed'));
    }
  });
};
