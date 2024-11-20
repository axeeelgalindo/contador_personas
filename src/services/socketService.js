// src/services/socketService.js
import { io } from 'socket.io-client';

const SIO_BASE_URL = 'https://ikcount.com';
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;


export const createSocket = (count) => {
  const socket = io(`${SIO_BASE_URL}/live`, {
    query: { atoken: ACCESS_TOKEN },
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('Conectado al servidor SocketIO');
  });

  socket.on('disconnect', () => {
    console.log('Desconectado del servidor SocketIO');
  });

  socket.on('connect_error', (err) => {
    console.error('Error de conexión SocketIO:', err.message);
  });

  // Manejador para el evento 'welcome'
  socket.on('welcome', (data) => {
    console.log('Evento recibido: welcome', data);
    const info = Array.isArray(data) ? data[0] : data;
    if (info && typeof info.current_aforo === 'number') {
      count.value = info.current_aforo;
      console.log('Conteo actualizado desde welcome:', count.value);
    } else {
      console.warn('El campo current_aforo no está disponible en el evento welcome');
    }
  });

  // Manejador para el evento 'raw'
  socket.on('raw', (data) => {
    console.log('Evento recibido: raw', data);
    const info = Array.isArray(data) ? data[0] : data;
    if (info && typeof info.current_aforo === 'number') {
      count.value = info.current_aforo;
      console.log('Conteo actualizado desde raw:', count.value);
    } else {
      console.warn('El campo current_aforo no está disponible en el evento raw');
    }
  });

  // Opcional: Manejador para el evento 'heartbeat'
  socket.on('heartbeat', (data) => {
    console.log('Evento recibido: heartbeat', data);
    // Si es necesario, puedes manejar este evento también
  });

  return socket;
};
