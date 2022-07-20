import { makeCreateBrand } from "../application/CreateBrand.js";
import { makeUpdateBrand } from "../application/UpdateBrand.js";
import { makeDeleteBrand } from "../application/DeleteBrand.js";
import { makeGetBrand } from "../application/GetBrand.js";
import { makeGetBrands } from "../application/GetBrands.js";

import { repositoryFactory } from "./repositories/factory.js";
import { sharedRepositoryFactory } from "../../shared/infrastructure/repositories/factory.js";

const brandRepository = repositoryFactory("brandRepository");
const storageRepository = sharedRepositoryFactory("storageRepository");

const createBrand = makeCreateBrand({ brandRepository, storageRepository });
const updateBrand = makeUpdateBrand({ brandRepository, storageRepository });
const deleteBrand = makeDeleteBrand({ brandRepository, storageRepository });
const getBrands = makeGetBrands({ brandRepository });
const getBrand = makeGetBrand({ brandRepository });

export const BrandController = Object.freeze({
  create: ({ brand, file }) => createBrand(brand, file),
  update: ({ brand, file, id }) => updateBrand(id, brand, file),
  deleteOne: ({ id }) => deleteBrand(id),
  getAll: getBrands,
  getOne: ({ id }) => getBrand(id),
});
