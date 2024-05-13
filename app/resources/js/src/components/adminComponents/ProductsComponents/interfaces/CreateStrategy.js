import Fetch from "../../../../api/api.js";

export class CreateProductStrategy {
    async send(body) {
        return await Fetch.post('admin/products', body);
    }
}
