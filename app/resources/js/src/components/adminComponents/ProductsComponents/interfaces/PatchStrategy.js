import Fetch from "../../../../api/api.js";
import {CreateProductStrategy} from "./CreateStrategy.js";

export class PatchProductStrategy {
    async send(body, id) {
        return await Fetch.changeUpload(`admin/products/${id}`, body);
    }
}
