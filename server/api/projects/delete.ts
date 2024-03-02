import { projects } from "~/server/dbModels";
export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);
    const data = await projects.deleteOne({ _id: options.id });
    return data
})