export const Category = ({
    _id,
    tree,
    idsTree,
    features,
    isFirstParent,
    name,
    breadcrumb
}) => {

    return Object.freeze({
        _id,
        tree,
        idsTree,
        features,
        isFirstParent,
        name,
        breadcrumb
    })
}