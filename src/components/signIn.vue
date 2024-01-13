<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['switchWindow']);
const showPassword = ref(false);
const email = ref('');
const password = ref('');
const rules = {
  required: value => !!value || 'Campo obrigatório.',
  min: v => v.length >= 8 || 'Mínimo 8 caracteres',
  email: v => /^\S+@\S+\.\S+$/.test(v) || 'E-mail inválido',
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const submitForm = () => {
  
};

const switchWindow = () => {
  props.switchWindow();
};
</script>


<template>
  <v-card style="box-shadow: none;">
    <v-card-title>ENTRAR</v-card-title>
    <v-card-text>
      Bem-vindo ao sistema de agendamento BP AGENDA
    </v-card-text>

    <form @submit.prevent="submitForm">
      <v-text-field
        v-model="email"
        clearable
        label="Email"
        :rules="[rules.required, rules.email]"
        class="my-5"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPassword ? 'text' : 'password'"
        label="Senha"
        hint="Mínimo de 8 caracteres."
        class="input-group--focused my-5"
        @click:append-inner="togglePasswordVisibility"
      ></v-text-field>

      <v-btn
        block
        class="mb-5 mx-auto"
        color="blue"
        size="large"
        variant="tonal"
        type="submit"
        max-width="50%"
      >
        ENTRAR
      </v-btn>

      <v-card-text class="text-center">
  <a
    class="text-blue text-decoration-none"
    href="#"
    rel="noopener noreferrer"
    target="_blank"
    @click.prevent="switchWindow" 
  >
    Criar uma conta <v-icon icon="mdi-chevron-right"></v-icon>
  </a>
</v-card-text>

    </form>
  </v-card>
</template>