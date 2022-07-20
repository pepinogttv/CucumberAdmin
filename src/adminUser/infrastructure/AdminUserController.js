
import { makeCreateAdminUser } from "../application/CreateAdminUser.js";
import { makeLoginAdminUser } from "../application/LoginAdminUser.js";
import { makeGetAdminUsers } from "../application/GetAdminUsers.js";
import { makeAddProductUploaded } from "../application/AddProductUploaded.js";
import { makeGetAdminUser } from "../application/GetAdminUser.js"
import { tokenGenerator } from "./tokenGenerator.js";
import { passwordEncrypter } from "./passwordEncrypter.js";

import { repositoryFactory } from "./repositories/factory.js";
const adminUserRepository = repositoryFactory("adminUserRepository");

const createAdminUser = makeCreateAdminUser({ adminUserRepository, passwordEncrypter, tokenGenerator });
const loginAdminUser = makeLoginAdminUser({ adminUserRepository, passwordEncrypter, tokenGenerator });
const getAdminUsers = makeGetAdminUsers({ adminUserRepository });
const getAdminUser = makeGetAdminUser({ adminUserRepository });
const addProductUploaded = makeAddProductUploaded({ adminUserRepository });


export const AdminUserController = Object.freeze({
    create: ({ username, password }) => createAdminUser(username, password),
    login: ({ username, password }) => loginAdminUser(username, password),
    getAll: getAdminUsers,
    addProductUploaded: ({ user, product }) => addProductUploaded(user, product),
    getOne: ({ id }) => getAdminUser(id)
})