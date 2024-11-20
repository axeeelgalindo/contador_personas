// src/services/apiService.js
import axios from "axios";

// Usa la ruta relativa que será manejada por el proxy de Vite
const API_BASE_URL = 'https://ikcount.com/iklab/ikcount/api/counting/command';
const ACCESS_TOKEN =
  "Z2FsaW5kby5kZWwuYXhlbDpBUElfS0VZQDJkMzViMTI5MjZlMzAwZjcxYzFmZjQ5YTQwZTYxNTdlNDdiYTBiOTk1OTIzYjk5MTU1NDJjOWJmY2Y4YWZkZmJkODJmOGIwMjU4NWFiMDEwMjk2YThhM2FlZjhiNzA4NjEzMzczMzE5ZjQxZmFiZWUyYzkwOWJlZjYyNWNmMzQyOklLTEFCMDA1";

export const sendCountingCommand = async (type, quantity) => {
  try {
    // Validaciones previas
    if (!["manual-add", "manual-sub"].includes(type)) {
      throw new Error(
        `Tipo inválido: ${type}. Debe ser 'manual-add' o 'manual-sub'.`
      );
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error(
        `Cantidad inválida: ${quantity}. Debe ser un número entero mayor que 0.`
      );
    }

    console.log(`Enviando comando a la API: ${type}, cantidad: ${quantity}`);
    const payload = {
      type,
      quantity,
      client: "DEMO001",
      location: "DEMO001A1L1",
      mac_address: "DEMO001A1L1Z1MC3",
    };
    console.log("Cuerpo de la solicitud:", payload);

    const response = await axios.post(
      `${API_BASE_URL}?atoken=${ACCESS_TOKEN}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Respuesta de la API:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.data);
      console.error("Estado:", error.response.status);
      console.error("Headers:", error.response.headers);
      alert(
        `Error de API: ${error.response.data.mssg || "Solicitud inválida"}`
      );
    } else {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    }
    throw error;
  }
};
