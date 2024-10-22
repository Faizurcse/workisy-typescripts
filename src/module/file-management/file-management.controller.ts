import { NextFunction, Response } from 'express';
import { RequestWithPayload } from '../../interface/shared/request.interface';
import { CheckErrors,  consoleLog,  DataResponse, ErrorValidations } from '../../utils/common';
import { deleteFromCloudinary, uploadToCloudinary } from '../../utils/cloudinary';
import createHttpError from 'http-errors';
import { ApiMessage } from '../../utils/messages';
import { FileUpload } from '../../interface/file-upload.interface';

class FileManagementController {
  public uploadSingle = async (req: RequestWithPayload, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      const body: FileUpload = req.body;
      if (Object.keys(body).length == 0) throw new createHttpError.NotAcceptable(ApiMessage.emptybody);
      const data = await uploadToCloudinary(file.path, body.identifier, body.contactInfo);
      DataResponse(req, res, 200, 'file uploaded successfully', { url: data });
    } catch (error) {
      next(error);
    }
  };
  public deleteSingle = async (req: RequestWithPayload, res: Response, next: NextFunction) => {
    try {
      const body: FileUpload = req.body;
      if (Object.keys(body).length == 0) throw new createHttpError.NotAcceptable(ApiMessage.emptybody);
      await deleteFromCloudinary(body.identifier, body.contactInfo);
      DataResponse(req, res, 200, 'file deleted successfully', null, body);
    } catch (error) {
      next(error);
    }
  };
}
export default FileManagementController;
