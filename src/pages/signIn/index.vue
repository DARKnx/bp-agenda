<template>
  <v-container fluid fill-height align-center style="height: 100vh; width: 100vw;">
    <v-window v-model="selectedWindow" style="height: 100%; width: 100%;">
      <v-window-item :value="1" style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
        <v-card class="text-center pa-15 mx-auto" style="min-height: 50%;  height: auto; width: 40%;">
          <SignIn :switchWindow="switchWindow" />
        </v-card>
      </v-window-item>

      <v-window-item :value="2" style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
        <v-card class="text-center pa-5" style="height: 70%; width: 40%;">
          <v-card-title>Window 2</v-card-title>
          <v-card-text>
            Conteúdo da Janela 2
          </v-card-text>
          <v-btn @click="switchWindow">Ir para a Janela 1</v-btn>
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

import SignIn from '../../components/signIn.vue';

const selectedWindow = ref(1);

const switchWindow = () => {
  selectedWindow.value = selectedWindow.value === 1 ? 2 : 1;
};
</script>
