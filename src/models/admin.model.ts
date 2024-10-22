import { Schema, model, Document } from 'mongoose';
import { Admin } from '../interface/admin.interface';

const adminSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    currentCompanyName: { type: String, required: true, trim: true },
    currentDesignation: { type: String, required: true, trim: true },
    addressLine1: { type: String, required: true, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    stateProvinceRegion: { type: String, required: true, trim: true },
    countryAddress: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true },
    totalExperienceInHiring: { type: String, required: true, trim: true },
    levelIHireFor: { type: String, required: true, trim: true },
    referralCode: { type: String, trim: true },
    industry: { type: [String], required: true, maxlength: 4 },
    function: { type: [String], required: true, maxlength: 4 },
    skillsIHireFor: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const AdminSchema = model<Admin & Document>('admin', adminSchema);

export default AdminSchema;
