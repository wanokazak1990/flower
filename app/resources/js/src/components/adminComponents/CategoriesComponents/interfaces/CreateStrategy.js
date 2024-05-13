import Fetch from "../../../../api/api.js";

export class CreateCategoryStrategy {
    async send(name) {
        return await Fetch.post('admin/categories', {name: name, sort: 1});
    }
}
