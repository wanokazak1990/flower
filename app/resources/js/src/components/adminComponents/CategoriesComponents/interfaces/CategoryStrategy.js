class CategoryStrategy {
    #strategy = {}
    setStrategy(strategy) {
        this.#strategy = strategy
    }
    async send(name, id = 0) {
        return await this.#strategy.send(name, id);
    }
}
const categoryStrategy = new CategoryStrategy();
export default categoryStrategy;
