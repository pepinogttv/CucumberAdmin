import { mongoCategoryRepository } from "./MongoCategoryRepository.js"

const repositories = {
    categoryRepository: mongoCategoryRepository,
}

export const repositoryFactory = (name) => repositories[name];