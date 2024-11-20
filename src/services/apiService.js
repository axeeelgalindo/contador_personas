import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const CLIENT = import.meta.env.VITE_CLIENT;
const LOCATION = import.meta.env.VITE_LOCATION;
const MAC_ADDRESS = import.meta.env.VITE_MAC_ADDRESS;


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
      client: CLIENT,
      location: LOCATION,
      mac_address: MAC_ADDRESS,
    };
    console.log("Cuerpo de la solicitud:", payload);

    const response = await axios.post(
      `${API_BASE_URL}/ikcount/api/counting/command?atoken=${ACCESS_TOKEN}`,
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
