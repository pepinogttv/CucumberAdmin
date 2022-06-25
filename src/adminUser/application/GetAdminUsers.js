export function getAdminUsers({ adminUserRepository }) {
    return async function () {
        return adminUserRepository.getAll();
    }
}