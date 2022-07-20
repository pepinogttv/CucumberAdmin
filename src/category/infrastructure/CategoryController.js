
import { makeCreateCategory } from "../application/CreateCategory.js"
import { makeUpdateCategory } from "../application/UpdateCategory.js"
import { makeGetCategories } from "../application/GetCategories.js"
import { makeGetCategory } from "../application/GetCategory.js"
import { makeDeleteCategory } from "../application/DeleteCategory.js"
import { makeCreateChildCategory } from "../application/CreateChildCategory.js"

import { repositoryFactory } from "./repositories/factory.js"
import { repositoryFactory as productRepositoryFactory } from "../../product/infrastructure/repositories/factory.js"

const categoryRepository = repositoryFactory("categoryRepository")
const productRepository = productRepositoryFactory("productRepository")


const createCategory = makeCreateCategory({ categoryRepository, productRepository })
const updateCategory = makeUpdateCategory({ categoryRepository, productRepository })
const getCategories = makeGetCategories({ categoryRepository })
const getCategory = makeGetCategory({ categoryRepository })
const deleteCategory = makeDeleteCategory({ categoryRepository, productRepository })
const createChildCategory = makeCreateChildCategory({ categoryRepository })

export const CategoryController = Object.freeze({
    create: ({ body: { category } }) => createCategory(category),
    createChild: ({ body: { category } }) => createChildCategory(category),
    update: ({ params, body: { category } }) => updateCategory(params.id, category.name, category.features),
    getAll: () => getCategories(),
    getOne: ({ params }) => getCategory(params.id),
    deleteOne: ({ params }) => deleteCategory(params.id),
})