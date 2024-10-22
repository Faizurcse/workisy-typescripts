import createHttpError from "http-errors";
import CounterSchema from "../models/counter.model";

export function generateAutoIncrementId(name: String) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await CounterSchema.findByIdAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { returnOriginal: false, upsert: true },
      );
      if (!data) throw new createHttpError.NotAcceptable('Error Creating Auto Increment Id');
      resolve(data.seq);
    } catch (error) {
      reject(error);
    }
  });
}
export function setAutoIncrementId(name: String, number: Number) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await CounterSchema.findByIdAndUpdate(
        { _id: name },
        { $set: { seq: number } },
        { returnOriginal: false, upsert: true },
      );
      if (!data) throw new createHttpError.NotAcceptable('Error Creating Auto Increment Id');
      resolve(data.seq);
    } catch (error) {
      reject(error);
    }
  });
}
