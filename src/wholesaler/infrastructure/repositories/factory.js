import { playwrightWholesalerCategoriesGetterRepository } from "./PlaywrightWholesalerCategoriesGetterRepository.js";
import { mongoWholesalerRepository } from "./MongoWholesalerRepository.js";

const repositories = {
    wholesalerCategoriesGetterRepository: playwrightWholesalerCategoriesGetterRepository,
    wholesalerRepository: mongoWholesalerRepository
};

export const repositoryFactory = (name) => repositories[name];