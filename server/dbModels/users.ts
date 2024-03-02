import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        password: String,
        name: String,
        aboutMe: String,
        isActive: Boolean,
        role: String,
    },
);

export default mongoose.model("users", schema);