
import { Category } from '../domain/CategoryEntity.js';

export function updateCategory({ categoryRepository }) {
    return async function (id, newName) {

        const category = await categoryRepository.getOneById(id);
        const newTree = category.tree.map((name) => name === category.name ? newName : name);
        const newBreadcrumb = category.breadcrumb.replace(category.name, newName);

        const categoryBeforeUpdate = await categoryRepository.update(id, {
            name: newName,
            tree: newTree,
            breadcrumb: newBreadcrumb
        });

        const { name: oldName } = categoryBeforeUpdate;
        const categories = await categoryRepository.getAll();

        for (const category of categories) {
            if (category.name === newName) continue;
            const newTree = category.tree.map(name => name === oldName ? newName : name);
            const newBreadcrumb = category.breadcrumb.replace(oldName, newName);
            await categoryRepository.update(category.id, { tree: newTree, breadcrumb: newBreadcrumb });
        }

        return categoryBeforeUpdate;
    }
}