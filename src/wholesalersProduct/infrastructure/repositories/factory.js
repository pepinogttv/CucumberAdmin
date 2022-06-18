import { mongoWholesalerProductRepository } from "./MongoWholesalerProductRepository.js";
import { playwrightWholesalerProductsGetterRepository } from "./PlaywrightWholesalerProductsGetterRepository.js";


const repositores = {
    wholesalerProductRepository: mongoWholesalerProductRepository,
    wholesalerProductsGetterRepository: playwrightWholesalerProductsGetterRepository
}

export const repositoryFactory = (name) => repositores[name];