import mongoose, { model, Schema, Document } from 'mongoose';
interface counterSchemaInterface {
  _id: String;
  seq: number;
}

const counterSchema: Schema = new Schema(
  {
    _id: { type: String,required: true },
    seq: { type: Number, default: 0 },
  },
  { timestamps: true },
);
const CounterSchema = model<counterSchemaInterface & Document>('counter', counterSchema);

export default CounterSchema;
