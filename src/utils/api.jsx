import axios from "axios"

const apiInstance = axios.create({
    baseURL: "https://medical-service-api.onrender.com/"
});

export default apiInstance;