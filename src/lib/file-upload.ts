import axios from "./axios";

export async function upload(formData: FormData) {
    try {
        const response = await axios.post('/upload', formData);
        return response.data.path;
    } catch (error) {
        console.log(error);
        throw error;
    }
}