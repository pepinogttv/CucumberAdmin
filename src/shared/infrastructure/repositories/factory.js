import { dollarRepository } from './DollarRepository.js';
import { firebaseStorageRepository } from './FirebaseStorageRepository.js';
import { playwrightWholesalerAuthStateRepository } from './PlaywrightWholesalerAuthStateRepository.js'

const repositories = {
    dollarRepository,
    storageRepository: firebaseStorageRepository,
    wholesalerAuthStateRepository: playwrightWholesalerAuthStateRepository
}

export const sharedRepositoryFactory = (name) => repositories[name];