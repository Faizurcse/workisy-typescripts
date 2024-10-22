import { NODE_ENV, LOCAL_DB_URL, DB_USERNAME, DB_PASSWORD, DB_URL } from '../config';
export enum DatabaseNames {
}
export const dbConnection = {
  url: NODE_ENV == 'local' ? LOCAL_DB_URL : `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}${DB_URL}`,
  options: {},
};
