import { mongoCategoryRepository } from "./MongoCategoryRepository.js"

const repositores = {
    categoryRepository: mongoCategoryRepository,
}

export const repositoryFactory = (name) => repositores[name];