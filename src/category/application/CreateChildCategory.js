
import { Category } from '../domain/CategoryEntity.js';

export function createChildCategory({ categoryRepository }) {
    return async function (categoryData) {

        const { fatherTree, fatherIdsTree } = categoryData;

        if (!fatherTree.length || !fatherIdsTree.length) {
            throw new Error('Child Category can not be created without a father');
        }

        const _id = categoryRepository.generateId();
        const tree = [...fatherTree, categoryData.name];
        const idsTree = [...fatherIdsTree, _id];
        const breadcrumb = tree.join(' > ');

        const category = Category({
            _id,
            name: categoryData.name,
            tree,
            isFirstParent: false,
            idsTree,
            breadcrumb
        });

        return await categoryRepository.create(category);
    }
}