// src/stores/counter.js
import { ref, onMounted, onUnmounted } from 'vue';
import { defineStore } from 'pinia';
import { createSocket } from '../services/socketService';
import axios from 'axios';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  let socket = null;
  
  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
  const API_BASE_URL = 'https://ikcount.com/iklab';

  const increment = async (quantity = 1) => {
    try {
      await axios.post(
        `${API_BASE_URL}/ikcount/api/counting/command?atoken=${ACCESS_TOKEN}`,
        {
          type: 'manual-add',
          quantity,
          client: 'DEMO001',
          location: 'DEMO001A1L1',
          mac_address: 'DEMO001A1L1Z1MC3',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error al incrementar el conteo:', error);
    }
  };

  const decrement = async (quantity = 1) => {
    try {
      await axios.post(
        `${API_BASE_URL}/ikcount/api/counting/command?atoken=${ACCESS_TOKEN}`,
        {
          type: 'manual-sub',
          quantity,
          client: 'DEMO001',
          location: 'DEMO001A1L1',
          mac_address: 'DEMO001A1L1Z1MC3',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error al decrementar el conteo:', error);
    }
  };

  onMounted(() => {
    socket = createSocket(count);
  });

  onUnmounted(() => {
    if (socket) {
      socket.disconnect();
    }
  });

  return {
    count,
    increment,
    decrement,
  };
});
