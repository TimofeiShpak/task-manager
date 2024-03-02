import { users } from "~/server/dbModels";
export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);

    const userData = await users.findOne({
        email: options.email,
    })

    if (userData && `${userData._id}` !== options.id) {
        console.log(`User with email ${options.email} already exists`);
        return {
            isError: true,
            code: "USER_EXISTS",
            message: "User with given email already exists.",
        };
    } else {
        console.log(`Edit user`);
        const newUserData = await users.findByIdAndUpdate(options.id, options, { new: true })
        return prepareUserData(newUserData)
    }
})