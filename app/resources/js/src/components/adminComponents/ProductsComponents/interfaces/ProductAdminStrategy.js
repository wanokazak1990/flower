class ProductAdminStrategy {
    #strategy = {}
    setStrategy(strategy) {
        this.#strategy = strategy
    }
    async send(body, id = 0) {
        return await this.#strategy.send(body, id);
    }
}
const productAdminStrategy = new ProductAdminStrategy();
export default productAdminStrategy;
