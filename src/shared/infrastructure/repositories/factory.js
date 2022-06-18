import { dollarRepository } from './DollarRepository.js';
import { firebaseStorageRepository } from './FirebaseStorageRepository.js';

const repositories = {
    dollarRepository: dollarRepository,
    storageRepository: firebaseStorageRepository,
}

export const sharedRepositoryFactory = (name) => repositories[name];