import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        code: { type: String, unique: true },
        name: String,
        author: String,
        dateCreated: Date,
        editor: String,
        dateEdited: Date,
    },
);

export default mongoose.model("projects", schema);