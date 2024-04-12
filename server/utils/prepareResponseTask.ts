export const prepareTaskData = (data: any) => {
    if (data) {
        return {
            id: data._id,
            projectId: data.projectId,
            name: data.name,
            description: data.description,
            status: data.status,
            author: data.author,
            dateCreated: data.dateCreated,
            editor: data.editor,
            dateEdited: data.dateEdited,
            executor: data.executor,
        };
    } else {
        return null
    }
}