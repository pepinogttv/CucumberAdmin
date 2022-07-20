
import { makeCreateWholesaler } from "../application/CreateWholesaler.js"
import { makeUpdateWholesaler } from "../application/UpdateWholesaler.js";
import { makeGetWholesalers } from "../application/GetWholesalers.js"
import { makeDeleteWholesaler } from "../application/DeleteWholesaler.js"
import { makeGetWholesaler } from "../application/GetWholesaler.js"
import { makeUpdateWholesalerCategories } from "../application/UpdateWholesalerCategories.js"

import { sharedRepositoryFactory } from "../../shared/infrastructure/repositories/factory.js";
import { repositoryFactory } from "./repositories/factory.js";

const storageRepository = sharedRepositoryFactory("storageRepository");
const wholesalerRepository = repositoryFactory("wholesalerRepository");
const wholesalerCategoriesGetterRepository = repositoryFactory("wholesalerCategoriesGetterRepository");

const createWholesaler = makeCreateWholesaler({ wholesalerRepository, storageRepository });
const updateWholesaler = makeUpdateWholesaler({ wholesalerRepository, storageRepository })
const getWholesalers = makeGetWholesalers({ wholesalerRepository })
const deleteWholesaler = makeDeleteWholesaler({ wholesalerRepository, storageRepository })
const getWholesaler = makeGetWholesaler({ wholesalerRepository })
const updateWholesalerCategories = makeUpdateWholesalerCategories({ wholesalerRepository, wholesalerCategoriesGetterRepository })

export const WholesalerController = Object.freeze({
    create: ({ wholesaler, file }) => createWholesaler(wholesaler, file),
    update: ({ id, wholesaler, file }) => updateWholesaler(id, wholesaler, file),
    getAll: getWholesalers,
    getOne: ({ id }) => getWholesaler(id),
    deleteOne: ({ id }) => deleteWholesaler(id),
    updateCategories: ({ wholesaler }) => updateWholesalerCategories(wholesaler)
})