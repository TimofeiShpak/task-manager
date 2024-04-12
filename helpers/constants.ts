export const TYPE_SORT = {
    ASC: 'ASC',
    DESC: 'DESC'
}

export const ATTRIBUTE_SORT = {
    NAME: 'name',
    AUTHOR: 'author',
    DATE_CREATED: 'dateCreated',
    DATE_EDITED: 'dateEdited',
}

export const ATTRIBUTE_SORT_NAME = {
    NAME: 'Name',
    AUTHOR: 'Author',
    DATE_CREATED: 'Date created',
    DATE_EDITED: 'Date edited',
}

const keys = Object.keys(ATTRIBUTE_SORT) as Array<keyof typeof ATTRIBUTE_SORT>
export const OPTIONS_SORT = keys.map((x) => {
    return {
        label: ATTRIBUTE_SORT_NAME[x],
        value: ATTRIBUTE_SORT[x],
    };
})

export const ROLE_TYPE = {
    USER: 'USER',
    ADMIN: 'ADMIN'
}

export const STATUS_TYPE = {
    DRAFT: 'DRAFT',
    IN_WORK: 'IN_WORK',
    COMPLETED: 'COMPLETED',
}

export const STATUS_TYPE_NAME = {
    DRAFT: 'Draft',
    IN_WORK: 'In work',
    COMPLETED: 'Completed',
}