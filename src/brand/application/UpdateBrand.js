export function makeUpdateBrand({ brandRepository, storageRepository }) {
    return async (id, { name }, file) => {
        console.log({ id })
        const brand = await brandRepository.getOneById(id);
        const isNewName = name && name !== brand.name;


        const data = {}
        if (file && isNewName) {
            console.log('ENTRA 1')
            await storageRepository.deleteImage(brand.logo)
            data.logo = await storageRepository.uploadImage(file, `brands`, name);
            data.name = name;
        } else if (file && !isNewName) {
            console.log('ENTRA 2')
            await storageRepository.deleteImage(brand.logo)
            data.logo = await storageRepository.uploadImage(file, `brands`, brand.name);
        } else if (!file && isNewName) {
            console.log('ENTRA 3')
            data.name = name;
        } else {
            console.log('ENTRA 4')
            throw new Error("Error updating brand");
        }

        return await brandRepository.update(id, data);


    }
}