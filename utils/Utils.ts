import users from '~/helpers/api/users';
import projects from '~/helpers/api/projects';
import tasks from '~/helpers/api/tasks';
import { api, dateToString, checkByRules } from '~/helpers/helpers'

export default {
    fetchApi: {
        users: users(api),
        projects: projects(api),
        tasks: tasks(api),
    },
    dateToString,
    checkByRules,
}