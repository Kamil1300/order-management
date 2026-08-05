import mongoose from 'mongoose';
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI

export const connectDB = async () => {
  mongoose.connect(`${MONGODB_URI}`,{dbName:"order-management"}).then(() => console.log('DB Connected!'));
  return mongoose.connection
}