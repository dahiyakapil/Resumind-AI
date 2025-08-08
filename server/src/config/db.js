import mongoose from "mongoose"


export const db = async () => {
    
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected Succesfully || ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection FAILED", error)
    }
}