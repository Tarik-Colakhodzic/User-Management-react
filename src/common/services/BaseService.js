import axios from "axios";

class BaseService {
    apiUrl = "https://localhost:44394/api/";

    constructor(resource) {
        this.apiUrl += resource;
    }

    async getAsync(params) {
        return await axios.get(this.apiUrl, { params: params });
    };

    async getByIdAsync(id) {
        return await axios.get(this.apiUrl + "/" + id);
    };

    async postAsync(params) {
        return await axios.post(this.apiUrl, params);
    };

    async putAsync(id, params) {
        console.log(id, params);
        return await axios.put(this.apiUrl + "/" + id, params);
    };

    async deleteAsync(id) {
        return await axios.delete(this.apiUrl + "/" + id);
    };
}

export default BaseService;