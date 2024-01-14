<template>
    <Layout>
      <div style="width: 50%; margin: auto;">
        <v-text-field 
          :rules="[rules.required]"
          prepend-inner-icon="mdi mdi-alphabetical-variant"
          v-model="name" 
          label="Nome" 
          class="my-2"
          clearable 
        />
        <v-textarea
          name="input-7-1"
          :rules="[rules.required]"
          prepend-inner-icon="mdi mdi-text-account"
          v-model="resume" 
          variant="filled"
          label="Resumo"
          class="my-2"
          auto-grow
          clearable
        />
        <v-select
          :items="['normal', 'admin', 'consultor']"
          v-model="role"
          label="Cargo"
          class="my-2"
        />
        <v-select
          :items="['online', 'presencial', 'online e presencial']"
          label="Qual estilo de reunião prefere?"
          v-model="meetingPreference"
          clearable
          class="my-2"
        />
        <v-select
          :items="['sim', 'não']"
          label="Permitir agendamento sem solicitação prévia?"
          v-model="schedulingWithoutRequest"
          clearable
          class="my-2"
        />
        <v-btn block class="mb-5 mx-auto" color="blue" size="large" variant="tonal" type="submit" max-width="50%">
            ATUALIZAR INFORMAÇÕES
        </v-btn>
        <v-btn block class="mb-5 mx-auto" color="red" size="large" variant="tonal" type="submit" max-width="50%">
            APAGAR CONTA
        </v-btn>
      </div>
    </Layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  import Layout from '../../components/layout/index.vue';
  import { useUserStore } from '../../stores/user.ts';
  
  const store = useUserStore();

  const resume = ref( store.user.resume|| '');
  const role = ref( store.user.role || '');
  const schedulingWithoutRequest = ref('');
  const name = ref( store.user.name|| '');
  const meetingPreference = ref('');

  const rules = {
      required: value => !!value || 'Campo obrigatório.'
  };
  </script>
  