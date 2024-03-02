import { tasks } from "~/server/dbModels";
export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);
    const data = await tasks.deleteOne({ _id: options.id });
    return data
})