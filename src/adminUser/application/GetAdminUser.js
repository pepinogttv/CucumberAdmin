export function makeGetAdminUser({ adminUserRepository }) {
    return async function (id) {
        return adminUserRepository.getOneById(id)
    }
}