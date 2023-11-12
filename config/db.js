import mongoose from "mongoose";

const database = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log(`database connected ,${connection.connection.host}`);
};
export default database;
