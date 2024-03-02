import { projects } from "~/server/dbModels";

export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);
    if (options.id) {
        options._id = options.id;
        delete options.id;
    }

    const data = await projects.findOne(options);
    return prepareProjectData(data)
})