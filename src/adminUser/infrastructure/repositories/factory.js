import { mongoAdminUserRepository } from "./MongoAdminUserRepository.js";

const repositories = {
    adminUserRepository: mongoAdminUserRepository,
}

export const repositoryFactory = (name) => repositories[name];
