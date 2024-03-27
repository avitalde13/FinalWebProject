import axios from "axios";

export const uploadPhoto = async (photo: File) => {
    console.log("Uploading photo..." + photo)
    const formData = new FormData();
    if (photo) {
        formData.append("file", photo);
        axios.post('http://node42.cs.colman.ac.il:4002/file', formData, {
        }).then(res => {
            console.log(res);
           
        }).catch(err => {
            console.log(err);
           
        });
    };
}

