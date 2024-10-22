export type Identifier = 'adhaar' | 'pan' | 'gst' | 'profile' | 'mobile'|'image';
export interface FileUpload {
  identifier: Identifier;
  contactInfo: string;
}
