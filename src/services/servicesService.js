import api from './api'


export const getServices = async () => {
    try {
        const response = await api.get("/Services");
        console.log("Data from backend", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
}