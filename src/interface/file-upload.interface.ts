export type Identifier = 'adhaar' | 'pan' | 'gst' | 'profile' | 'mobile';
export interface FileUpload {
  identifier: Identifier;
  contactInfo: string;
}
