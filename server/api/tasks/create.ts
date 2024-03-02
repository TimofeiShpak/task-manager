import { STATUS_TYPE } from "~/helpers/constants";
import { tasks } from "~/server/dbModels";

export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);

    options.dateCreated = new Date();
    options.status = STATUS_TYPE.DRAFT;
    const newData = await tasks.create(options);
    return prepareTaskData(newData);
})