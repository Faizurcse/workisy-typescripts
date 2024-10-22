import { body } from 'express-validator';

export function FILE_UPLOAD_DELETE_VALIDATION() {
  return [
    body('contactInfo').notEmpty().withMessage('contactInfo Is Required'),
    body('identifier').notEmpty().withMessage('identifier Number Is Required'),
  ];
}
