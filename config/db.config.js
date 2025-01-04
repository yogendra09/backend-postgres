import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
      const conn = await mongoose.createConnection(process.env.MONGO_URL);
      console.log(`database connected!: ${conn._connectionString}`);
   

    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

