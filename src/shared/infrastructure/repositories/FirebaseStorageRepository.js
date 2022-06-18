import { initializeApp } from "firebase/app"
import { getStorage, getDownloadURL, uploadString, ref, deleteObject } from "firebase/storage";
// const randomFileName = () => String(Math.random()).split(".")[1];
import { randomUUID } from "crypto";

const firebaseConfig = {
    apiKey: "AIzaSyBhlICaACvztbBulgUk0U-1_5Q13cObVtQ",
    authDomain: "cucumber-d558d.firebaseapp.com",
    projectId: "cucumber-d558d",
    storageBucket: "cucumber-d558d.appspot.com",
    messagingSenderId: "1040962208638",
    appId: "1:1040962208638:web:305ffbfc158fe75261292f"
};
initializeApp(firebaseConfig);
const storage = getStorage();

export const firebaseStorageRepository = {
    uploadImages(images, path) {
        images = images.map(({ buffer }) => `data:image/png;base64,${buffer.toString('base64')}`);
        return Promise.all(images.map(async image => {
            const storageRef = ref(storage, `${path}/${randomUUID()}`);
            const snapshot = await uploadString(storageRef, image, "data_url");
            return getDownloadURL(snapshot.ref);
        }))
    },
    async uploadImage(image, path) {
        image = `data:image/png;base64,${image.buffer.toString('base64')}`
        const storageRef = ref(storage, `${path}/${randomUUID()}`);
        const snapshot = await uploadString(storageRef, image, "data_url");
        return getDownloadURL(snapshot.ref);
    },
    deleteImages(imagesUrls) {
        if (!imagesUrls || !imagesUrls.length) return Promise.resolve();
        return Promise.all(imagesUrls.map(url => deleteObject(ref(storage, url))));
    },
    deleteImage(imageUrl) {
        if (!imageUrl) return Promise.resolve();
        return deleteObject(ref(storage, imageUrl));
    }
}