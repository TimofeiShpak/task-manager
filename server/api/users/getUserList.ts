import { users } from "~/server/dbModels";
import { TYPE_SORT } from '~/helpers/constants';
import mongoose from "mongoose";

export default defineWrappedResponseHandler(async (event) => {
    const options = await readBody(event);
    const dto = options.data || {}
    if (!dto.name) {
        delete dto.name
    } else {
        dto.name = new RegExp(dto.name)
    }
    if (options.idList) {
        dto._id = { $in: options.idList.map((x: string) => new mongoose.Types.ObjectId(x)) }
    }

    let sortOptions = { name: 1 } as { [key: string]: -1 | 1 }
    if (options.sort === TYPE_SORT.DESC) {
        sortOptions.name = -1
    }
    const usersData = await users.find(dto)
        .limit(options.limit)
        .skip(options.limit * options.page)
        .sort(sortOptions)
    const total = await users.countDocuments(dto);
    return {
        data: usersData.map(x => prepareUserData(x)),
        page: options.page,
        limit: options.limit,
        total: total
    }
})