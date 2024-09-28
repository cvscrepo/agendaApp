// src/services/api.js
import axios from "axios";

// Crear una instancia de axios con configuraciones base
const api = axios.create({
  baseURL: "https://localhost:7108/api", // Cambia por la URL de tu API
  timeout: 5000, // Establece un tiempo de espera de 5 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptores para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
