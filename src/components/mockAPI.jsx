import axios from "axios"

const mockAPI = axios.create({
    baseURL:"https://68bf54cd9c70953d96ef54f6.mockapi.io"
});

export default mockAPI