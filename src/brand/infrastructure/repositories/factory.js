import { mongoBrandRepository } from './MongoBrandRepository.js'

const repositories = {
    brandRepository: mongoBrandRepository
}

export const repositoryFactory = (name) => repositories[name];
