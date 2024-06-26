import { tasks, projects } from "~/server/dbModels";
import { TYPE_SORT } from '~/helpers/constants';
import mongoose from "mongoose";

export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);
    const dto = options.data || {};
    let projectIds = null;
    if (dto.project) {
        projectIds = [dto.project];
        dto.projectId = dto.project;
        delete dto.project;
    }
    if (!dto.name) {
        delete dto.name
    } else {
        dto.name = new RegExp(dto.name)
    }
    let sortDirection = options.sort.type === TYPE_SORT.DESC ? -1 : 1 as -1 | 1;
    let sortOptions = {} as { [key: string]: -1 | 1 };
    sortOptions[options.sort.attribute] = sortDirection;

    const items = await tasks.find(dto)
        .limit(options.limit)
        .skip(options.limit * options.page)
        .sort(sortOptions);
    const total = await tasks.countDocuments(dto);

    if (!projectIds) {
        projectIds = [...new Set(items.map(x => x.projectId))]
    }

    const dtoProjects = { _id: { $in: projectIds.map(x => new mongoose.Types.ObjectId(x)) } }
    const projectsData = await projects.find(dtoProjects).select({ code: 1 });
    const projectsMap = {} as { [key: string]: string };
    projectsData.forEach(x => projectsMap[x.id] = x.code as string)
    const itemsWithCodes = items.map(x => {
        let item = prepareTaskData(x);
        if (x && x.projectId) {
            let newItem = {
                ...item,
                code: projectsMap[x.projectId],
            }
            return newItem;
        } else {
            return item
        }
    })

    return {
        data: itemsWithCodes,
        page: options.page,
        limit: options.limit,
        total: total
    }
})