import Fetch from "../../../../api/api.js";

export class PatchCategoryStrategy {
    async send(name, id) {
        return await Fetch.patch(`admin/categories/${id}`, {name: name, sort: 1});
    }
}
