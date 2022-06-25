import makeUseCase from "../../shared/application/MakeUseCase.js"

import { createCategory } from "../application/CreateCategory.js"
import { updateCategory } from "../application/UpdateCategory.js"
import { getCategories } from "../application/GetCategories.js"
import { getCategory } from "../application/GetCategory.js"
import { deleteCategory } from "../application/DeleteCategory.js"

import { repositoryFactory } from "./repositories/factory.js"
import { repositoryFactory as productRepositoryFactory } from "../../product/infrastructure/repositories/factory.js"
import { createChildCategory } from "../application/CreateChildCategory.js"

const categoryRepository = repositoryFactory("categoryRepository")
const productRepository = productRepositoryFactory("productRepository")

export const CategoryController = Object.freeze({
    create: ({ body: { name } }) => makeUseCase(
        createCategory,
        { categoryRepository }
    )(name),
    createChild: ({ body: { name, fatherTree, fatherIdsTree } }) => makeUseCase(
        createChildCategory,
        { categoryRepository }
    )({ name, fatherTree, fatherIdsTree }),
    update: ({ params, body: { name } }) => makeUseCase(
        updateCategory,
        { categoryRepository }
    )(params.id, name),
    getAll: () => makeUseCase(
        getCategories,
        { categoryRepository }
    )(),
    getOne: ({ params }) => makeUseCase(
        getCategory,
        { categoryRepository }
    )(params.id),
    deleteOne: ({ params }) => makeUseCase(
        deleteCategory,
        { categoryRepository, productRepository }
    )(params.id),
})