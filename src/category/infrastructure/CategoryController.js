import makeUseCase from "../../shared/application/MakeUseCase.js"

import { createCategory } from "../application/CreateCategory.js"
import { updateCategory } from "../application/UpdateCategory.js"
import { getCategories } from "../application/GetCategories.js"
import { getCategory } from "../application/GetCategory.js"
import { deleteCategory } from "../application/DeleteCategory.js"

import { repositoryFactory } from "./repositories/factory.js"
import { repositoryFactory as productRepositoryFactory } from "../../product/infrastructure/repositories/factory.js"
import { createChildCategory } from "../application/CreateChildCategory.js"

const categoryRepostory = repositoryFactory("categoryRepository")
const productRepository = productRepositoryFactory("productRepository")

export const CategoryController = Object.freeze({
    create: ({ body: { name } }) => makeUseCase(
        createCategory,
        categoryRepostory
    )(name),
    createChild: ({ body: { name, fatherTree, fatherIdsTree } }) => makeUseCase(
        createChildCategory,
        categoryRepostory
    )({ name, fatherTree, fatherIdsTree }),
    update: ({ params, body: { name } }) => makeUseCase(
        updateCategory,
        categoryRepostory
    )(params.id, name),
    getAll: () => makeUseCase(
        getCategories,
        categoryRepostory
    )(),
    getOne: ({ params }) => makeUseCase(
        getCategory,
        categoryRepostory
    )(params.id),
    deleteOne: ({ params }) => makeUseCase(
        deleteCategory,
        categoryRepostory,
        productRepository
    )(params.id),

})