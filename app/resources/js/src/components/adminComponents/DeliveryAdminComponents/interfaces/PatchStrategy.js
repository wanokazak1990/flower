import Fetch from "../../../../api/api.js";

export class PatchDeliveryStrategy {
    async send(name, id) {
        return await Fetch.patch(`admin/deliveries/${id}`, {name: name});
    }
}
