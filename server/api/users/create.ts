import { users } from "~/server/dbModels";

export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);

    const userData = await users.findOne({
        email: options.email,
    })

    if (userData) {
        console.log(`User with email ${options.email} already exists`);
        return {
            isError: true,
            code: "USER_EXISTS",
            message: "User with given email already exists.",
        };
    } else {
        console.log("Create user");
        const newUserData = await users.create(options);
        return prepareUserData(newUserData)
    }
})