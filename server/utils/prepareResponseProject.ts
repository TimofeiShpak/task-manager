export const prepareProjectData = (data: any) => {
    if (data) {
        return {
            id: data._id,
            name: data.name,
            code: data.code,
            author: data.author,
            dateCreated: data.dateCreated,
            editor: data.editor,
            dateEdited: data.dateEdited,
        };
    } else {
        return null
    }
}