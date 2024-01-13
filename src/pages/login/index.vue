<template>
  <v-container fluid fill-height align-center style="height: 100vh; width: 100vw;">
    <v-window v-model="selectedWindow" style="height: 100%; width: 100%;">
      <v-window-item :value="1" style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
        <v-card class="text-center pa-15 mx-auto" style="min-height: 50%;  height: auto; width: 40%;">
          <SignIn :switchWindow="switchWindow" />
        </v-card>
      </v-window-item>

      <v-window-item :value="2" style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
        <v-card class="text-center pa-15 mx-auto" style="min-height: 50%;  height: auto; width: 40%;">
          <SignUp :switchWindow="switchWindow" />
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

import SignIn from '../../components/login/signIn.vue';
import SignUp from '../../components/login/signUp.vue';

const selectedWindow = ref(1);

const switchWindow = () => {
  selectedWindow.value = selectedWindow.value === 1 ? 2 : 1;
};
</script>
