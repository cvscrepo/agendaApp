// src/services/appointmentService.js
import api from "./api"; // Importa la configuración de axios



// Obtener todas las citas
export const getAppointments = async () => {
    try {
        const response = await api.get("/Appointment");
        console.log("Data from backend", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
};

// Crear una nueva cita
export const createAppointment = async (appointmentData) => {
    try {
        const response = await api.post("/Appointment", appointmentData);
        return response.data;
    } catch (error) {
        console.error("Error creating appointment:", error);
        throw error;
    }
};

// Editar una cita existente
export const updateAppointment = async (id, appointmentData) => {
    try {
        const response = await api.put(`/Appointment/${id}`, appointmentData);
        return response.data;
    } catch (error) {
        console.error("Error updating appointment:", error);
        throw error;
    }
};

// Eliminar una cita
export const deleteAppointment = async (id) => {
    try {
        const response = await api.delete(`/Appointment/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting appointment:", error);
        throw error;
    }
};
