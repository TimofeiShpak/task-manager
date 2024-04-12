import { projects } from "~/server/dbModels";
import { TYPE_SORT, ATTRIBUTE_SORT } from '~/helpers/constants';
import mongoose from "mongoose";

export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);
    const dto = options.data || {}
    if (!dto.name) {
        delete dto.name
    } else {
        dto.name = new RegExp(dto.name)
    }
    let sortOptions = {} as { [key: string]: -1 | 1 };
    if (options.sort) {
        let sortDirection = options.sort.type === TYPE_SORT.DESC ? -1 : 1 as 1 | -1;
        sortOptions[options.sort.attribute] = sortDirection;
    } else {
        sortOptions[ATTRIBUTE_SORT.NAME] = 1;
    }

    if (options.idList) {
        dto._id = { $in: options.idList.map((x: string) => new mongoose.Types.ObjectId(x)) }
    }

    const items = await projects.find(dto)
        .limit(options.limit)
        .skip(options.limit * options.page)
        .sort(sortOptions)
    const total = await projects.countDocuments(dto);
    return {
        data: items.map(x => prepareProjectData(x)),
        page: options.page,
        limit: options.limit,
        total: total
    }
})