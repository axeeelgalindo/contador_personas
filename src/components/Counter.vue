<!-- src/components/Counter.vue -->
<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold mb-4 text-center uppercase ">Contador de Personas</h1>
    <div class="text-center mb-6">
      <span class="text-6xl font-bold">{{ count }}</span>
    </div>
    <div class="flex justify-center space-x-4">
      <button @click="decrement" class="px-4 py-2 bg-[#01b9cd] text-white rounded hover:opacity-85 font-bold tracking-wider uppercase">Restar</button>
      <button @click="increment" class="px-4 py-2 bg-[#ffde15] text-white rounded hover:opacity-85 font-bold tracking-wider uppercase">Sumar</button>
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
