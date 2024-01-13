<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signIn } from '../actions/user.ts';
import { useToast } from "vue-toastification";

const showPassword = ref(false);
const password = ref('');
const email = ref('');

const rules = {
  email: v => /^\S+@\S+\.\S+$/.test(v) || 'E-mail inválido',
  required: value => !!value || 'Campo obrigatório.',
  min: v => v.length >= 8 || 'Mínimo 8 caracteres',
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const router = useRouter();
const toast = useToast();

const submitForm = async () => {
  if (email.value.length == 0 || password.value.length == 0) {
    toast.error('Por favor, preencha todos os campos.');
    return;
  }

  const user = await signIn({ email: email.value, password: password.value });
  if (user?.message) {
    toast.error(user.message);
    return;
  }

  router.push('/dashboard');
};
</script>

<template>
  <v-card style="box-shadow: none;">
    <v-card-title class="text-h5 font-weight-bold">
      ENTRAR
    </v-card-title>
    <v-card-text class="text-subtitle-1 font-weight-regular">
      Bem-vindo ao sistema de agendamento BP AGENDA
    </v-card-text>
    <form @submit.prevent="submitForm">
      <v-text-field 
        :rules="[rules.required, rules.email]"
        v-model="email" 
        label="Email" 
        class="my-5"
        clearable 
        />
      <v-text-field 
        hint="Mínimo de 8 caracteres." class="input-group--focused my-5"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="togglePasswordVisibility"
        :type="showPassword ? 'text' : 'password'" 
        :rules="[rules.required, rules.min]" 
        v-model="password" 
        label="Senha"
      />
      <v-btn block class="mb-5 mx-auto" color="blue" size="large" variant="tonal" type="submit" max-width="50%">
        ENTRAR
      </v-btn>
      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank" @click.prevent="switchWindow">
          Criar uma conta 
          <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </form>
  </v-card>
</template>