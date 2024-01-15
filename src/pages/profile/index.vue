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
        :items="['cliente', 'corretor']"
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
      <v-btn @click="submitData" block class="mb-5 mx-auto" color="blue" size="large" variant="tonal" type="submit" max-width="50%">
          ATUALIZAR INFORMAÇÕES
      </v-btn>
      <v-btn @click="confirmDelete" block class="mb-5 mx-auto" color="red" size="large" variant="tonal" max-width="50%">
          APAGAR CONTA
      </v-btn>

      <v-dialog v-model="deleteDialog" max-width="500">
        <v-card class="pa-5">
          <v-card-title class="headline">
            Confirmar Exclusão de Conta
          </v-card-title>
          <v-card-text>
            Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.
          </v-card-text>
          <v-card-actions class="text-center">
            <v-btn @click="deleteAccount" color="red" text width="50%">
              Confirmar
            </v-btn>
            <v-btn @click="cancelDelete" text  width="50%">
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </Layout>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import Layout from '../../components/layout/index.vue';
import { useUserStore } from '../../stores/user.ts';
import { updateUser, deleteUser } from '../../actions/user.ts';

const store = useUserStore();
const router = useRouter();
const toast = useToast();

const schedulingWithoutRequest = ref(store.user.schedulingWithoutRequest || null);
const meetingPreference = ref(store.user.meetingPreference || null);
const resume = ref(store.user.resume || null);
const role = ref(store.user.role || '');
const name = ref(store.user.name || '');

const rules = {
  required: value => !!value || 'Campo obrigatório.'
};

const submitData = async () => {
  if (name.value.length === 0) return toast.error('Por favor, preencha todos os campos.');
  const user = await updateUser({ data: { role: role.value, name: name.value, resume: resume.value || '', schedulingWithoutRequest: schedulingWithoutRequest.value || '', meetingPreference: meetingPreference.value || '' } });
  if (user?.error) return toast.error(user.error);
  toast.success('Atualização bem-sucedida');
};

const deleteDialog = ref(false);

const confirmDelete = () => {
  deleteDialog.value = true;
};

const cancelDelete = () => {
  deleteDialog.value = false;
};

const deleteAccount = async () => {
  if (name.value.length === 0) return toast.error('Por favor, preencha todos os campos.');
  const user = await deleteUser({ data: { role: role.value, name: name.value, resume: resume.value || '', schedulingWithoutRequest: schedulingWithoutRequest.value || '', meetingPreference: meetingPreference.value || '' } });
  if (user?.error) return toast.error(user.error);
  toast.success('Conta apagada com sucesso');
  router.push('/logout');
};
</script>
