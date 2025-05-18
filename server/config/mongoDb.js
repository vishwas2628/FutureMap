import mongoose from "mongoose";


const connectDB = async () => {

    // MongoDB connection
    await mongoose.connect(`${process.env.MONGODB_URL}/futuremap`)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error("MongoDB connection error:", err));

}

export default connectDB;