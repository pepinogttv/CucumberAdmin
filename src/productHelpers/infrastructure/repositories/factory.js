import { playwrightProductHelperRepository } from "./PlaywrightProductHelperRepository.js";

const repositories = {
    productHelperRepository: playwrightProductHelperRepository
}


export const repositoryFactory = (name) => repositories[name];