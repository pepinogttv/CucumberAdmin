import { mongoProductRepository } from "./MongoProductRepository.js";

const repositories = {
    productRepository: mongoProductRepository
}

export const repositoryFactory = (name) => repositories[name];