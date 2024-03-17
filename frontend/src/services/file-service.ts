import axios from "axios";

export const uploadPhoto = async (photo: File) => {
    return new Promise<string>((resolve, reject) => {
        console.log("Uploading photo..." + photo)
        const formData = new FormData();
        if (photo) {
            formData.append("file", photo);
            axios.post('http://localhost:3000/file', formData, {
            }).then(res => {
                console.log(res);
                resolve(res.data);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        }
    });
}

