import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_LOCAL,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useCreateIndex:true
    });
    console.log("DB Connected...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnection;
