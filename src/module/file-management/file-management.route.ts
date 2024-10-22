import { Router } from 'express';
import { Routes } from '../../interface/shared/routes.interface';
import { ApiV1 } from '../../utils/variable';
import FileManagementController from './file-management.controller';
import { uploadToCloud } from '../../utils/multer';
import { FILE_UPLOAD_DELETE_VALIDATION } from '../../validations/file-upload-validation';

class FileManagementRoute implements Routes {
  public path = '/filemanagement';
  public admin = '/admin';
  public router = Router();
  private fileManagementController = new FileManagementController();
  constructor() {
    this.initializeRoutes();
  }
  // admin
  private initializeRoutes() {
    //user
    this.router.post(
      `${ApiV1}${this.path}/upload`,
      FILE_UPLOAD_DELETE_VALIDATION(),
      uploadToCloud.single('file'),
      this.fileManagementController.uploadSingle,
    );
    this.router.delete(
      `${ApiV1}${this.path}/delete`,
      FILE_UPLOAD_DELETE_VALIDATION(),
      this.fileManagementController.deleteSingle,
    );
  }
}
export default FileManagementRoute;
