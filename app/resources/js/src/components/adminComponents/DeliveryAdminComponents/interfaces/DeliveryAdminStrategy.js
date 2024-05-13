class DeliveryAdminStrategy {
    #strategy = {}
    setStrategy(strategy) {
        this.#strategy = strategy
    }
    async send(name, id = 0) {
        return await this.#strategy.send(name, id);
    }
}
const deliveryAdminStrategy = new DeliveryAdminStrategy();
export default deliveryAdminStrategy;
