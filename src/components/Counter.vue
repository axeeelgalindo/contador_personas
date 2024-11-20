<!-- src/components/Counter.vue -->
<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-center">Contador de Personas</h1>
    <div class="text-center mb-6">
      <span class="text-6xl">{{ count }}</span>
    </div>
    <div class="flex justify-center space-x-4">
      <button @click="decrement" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Restar</button>
      <button @click="increment" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Sumar</button>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter';
import { computed } from 'vue';

const store = useCounterStore();

const count = computed(() => store.count);

const increment = () => {
  console.log('Botón Sumar clickeado');
  store.increment(1);
};

const decrement = () => {
  console.log('Botón Restar clickeado');
  store.decrement(1);
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si lo deseas */
</style>
