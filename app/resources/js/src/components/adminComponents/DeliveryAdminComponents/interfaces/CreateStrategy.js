import Fetch from "../../../../api/api.js";

export class CreateDeliveryStrategy {
    async send(name) {
        return await Fetch.post('admin/deliveries', {name: name});
    }
}
