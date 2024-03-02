import mongoose from "mongoose";

export default async () => {
    const config = useRuntimeConfig();

    try {
        await mongoose.connect(config.mongoUrl);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error(e, "Not connected to MongoDB");
    }
};