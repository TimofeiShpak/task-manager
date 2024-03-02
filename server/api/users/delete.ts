import { users } from "~/server/dbModels";
export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);
    if (options.id) {
        options._id = options.id;
        delete options.id;
    }
    const userData = await users.deleteOne(options);
    return userData
})