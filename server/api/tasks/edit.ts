import { tasks } from "~/server/dbModels";
export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);
    options.dateEdited = new Date();
    const newData = await tasks.findByIdAndUpdate(options.id, options, { new: true })
    return prepareTaskData(newData)
})