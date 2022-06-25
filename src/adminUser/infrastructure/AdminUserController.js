import makeUseCase from "../../shared/application/MakeUseCase.js"

import { createAdminUser } from "../application/CreateAdminUser.js";
import { loginAdminUser } from "../application/LoginAdminUser.js";
import { getAdminUsers } from "../application/GetAdminUsers.js";

import { tokenGenerator } from "./tokenGenerator.js";
import { passwordEncrypter } from "./passwordEncrypter.js";

import { repositoryFactory } from "./repositories/factory.js";
const adminUserRepository = repositoryFactory("adminUserRepository");

export const AdminUserController = Object.freeze({
    create: ({ body: { username, password } }) => makeUseCase(
        createAdminUser,
        { adminUserRepository, passwordEncrypter, tokenGenerator }
    )(username, password),
    login: ({ body: { username, password } }) => makeUseCase(
        loginAdminUser,
        { adminUserRepository, passwordEncrypter, tokenGenerator }
    )(username, password),
    getAll: () => makeUseCase(getAdminUsers, { adminUserRepository })()
})