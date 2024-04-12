import { STATUS_TYPE_NAME } from "./constants" 

export interface Task {
    id: string;
    projectId: string;
    name: string;
    description: string;
    status: keyof typeof STATUS_TYPE_NAME;
    author: string;
    dateCreated: Date;
    editor: string;
    dateEdited: Date;
    executor: string;
    code: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    aboutMe: string;
    isActive: boolean;
    role: string;
}

export interface Project {
    id: string;
    code: string;
    name: string;
    author: string;
    dateCreated: Date;
    editor: string;
    dateEdited: Date;
}

export interface AttributeSort {
    label: string;
    value: string;
}

export interface Sort {
    type: string;
    attribute: AttributeSort;
}

export interface Status {
    value: string;
    label: string;
}

export interface TaskFilter {
    project?: Project | null;
    status?: Status | null;
}

export interface Link {
    to: string;
    name: string;
}