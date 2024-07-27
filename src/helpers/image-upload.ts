import { firebaseApp } from "@/app/config/firebase";
import { getStorage , ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const UploadImageToFirebaseAndReturnUrls = async (files: File[]) => {
    try {
        //upload Images
        const storage = getStorage(firebaseApp)
        const uploadImageRefs = await Promise.all(
           files.map(async (file) => {
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file)
            return storageRef
           })
        )
        // get the urls of the images upload 
        const urls = await Promise.all(
            uploadImageRefs.map(async (ref) => {
                const url = await getDownloadURL(ref)
                return url
            })
        )

        return urls;
    } catch (error: any) {
        throw new Error(error)
    }
}