import { projects } from "~/server/dbModels";

export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);

    const data = await projects.findOne({
        code: options.code,
    })

    if (data) {
        console.log(`Project with code ${options.code} already exists`);
        return {
            isError: true,
            code: "CODE_EXISTS",
            message: "Project with given code already exists.",
        };
    } else {
        console.log("Create project");
        options.dateCreated = new Date();
        const newData = await projects.create(options);
        return prepareProjectData(newData)
    }
})