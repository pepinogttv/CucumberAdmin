
import { Category } from '../domain/CategoryEntity.js';

export function createCategory({ categoryRepository }) {
    return async function (name) {

        const _id = categoryRepository.generateId();
        const category = Category({
            _id,
            tree: [name],
            isFirstParent: true,
            idsTree: [_id],
            breadcrumb: name,
            name
        });

        return await categoryRepository.create(category);
    }
}