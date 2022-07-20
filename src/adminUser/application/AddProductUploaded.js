export function makeAddProductUploaded({ adminUserRepository }) {
    return async function (user, product) {
        return adminUserRepository.addProductUploaded(user, product);
    }
} 