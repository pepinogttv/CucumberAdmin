
import { Category } from '../domain/CategoryEntity.js';

export function createCategory({ categoryRepository }) {
    return async function ({ name, features }) {
        const _id = categoryRepository.generateId();

        const category = Category({
            _id,
            tree: [name],
            isFirstParent: true,
            idsTree: [_id],
            breadcrumb: name,
            name,
            features: features || [],
        });

        return await categoryRepository.create(category);
    }
}