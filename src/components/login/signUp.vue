<script setup>
    import { useToast } from "vue-toastification";
    import { useRouter } from 'vue-router';
    import { ref, defineProps } from 'vue';

    import { signUp } from '../../actions/user.ts';

    const showPassword = ref(false);
    const password = ref('');
    const email = ref('');
    const name = ref('');
    const role = ref('normal');

    const rules = {
      email: v => /^\S+@\S+\.\S+$/.test(v) || 'E-mail inválido',
      required: value => !!value || 'Campo obrigatório.',
      min: v => v.length >= 8 || 'Mínimo 8 caracteres',
    };

    const props = defineProps(['switchWindow']);
    const router = useRouter();
    const toast = useToast();

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    const switchWindow = () => {
      props.switchWindow();
    };


    const submitForm = async () => {
      if (email.value.length == 0 || password.value.length < 8 || name.value.length == 0) return toast.error('Por favor, preencha todos os campos.');
      if (!(/^\S+@\S+\.\S+$/.test(email.value))) return toast.error('E-mail inválido');

      const user = await signUp({ email: email.value, password: password.value, name: name.value, role: role.value});
      if (user?.error) return toast.error(user.error);
      toast.success('Autenticação bem-sucedida');
      router.push('/dashboard/calendar');
    };
</script>

<template>
  <v-card style="box-shadow: none;">
    <v-card-title :style="{ color: $vuetify.theme.themes.light.colors.secondary }" class="text-h5 font-weight-bold">
      CADASTRAR
    </v-card-title>
    <v-card-text class="text-subtitle-1 font-weight-regular">
      Bem-vindo ao sistema de agendamentos BP AGENDA
    </v-card-text>
    <form @submit.prevent="submitForm">
      <v-text-field 
        :rules="[rules.required]"
        prepend-inner-icon="mdi mdi-alphabetical-variant"
        v-model="name" 
        label="Nome" 
        class="my-5"
        clearable 
        />
      <v-text-field 
        :rules="[rules.required, rules.email]"
        prepend-inner-icon="mdi mdi-at"
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
        prepend-inner-icon="mdi mdi-lock"
        v-model="password" 
        label="Senha"
      />
      <v-select
        label="Cargo"
        v-model="role"
        :items="['normal', 'admin', 'consultor']"
      />
      <v-btn block class="mb-5 mx-auto" color="blue" size="large" variant="tonal" type="submit" max-width="50%">
        CADASTRAR
      </v-btn>
      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" color="primary" href="#" rel="noopener noreferrer" target="_blank" @click.prevent="switchWindow">
          
          <v-icon icon="mdi-chevron-left"></v-icon>
          Já tem uma conta?
        </a>
      </v-card-text>
    </form>
  </v-card>
</template>