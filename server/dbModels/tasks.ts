import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        projectId: String,
        name: String,
        description: String,
        status: String,
        author: String,
        dateCreated: Date,
        editor: String,
        dateEdited: Date,
        executor: String,
    },
);

export default mongoose.model("tasks", schema);