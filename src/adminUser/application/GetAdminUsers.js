export function makeGetAdminUsers({ adminUserRepository }) {
    return async function () {
        return adminUserRepository.getAll();
    }
}