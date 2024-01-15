<template>
  <Layout>
    <div style="width: 50%; margin: auto;">
      <v-text-field 
        :rules="[rules.required]"
        prepend-inner-icon="mdi mdi-alphabetical-variant"
        v-model="name" 
        label="Seu nome" 
        class="my-2"
        clearable 
      />
      <v-textarea
        name="input-7-1"
        :rules="[rules.required]"
        prepend-inner-icon="mdi mdi-text-account"
        v-model="resume" 
        variant="filled"
        label="Descrição"
        class="my-2"
        auto-grow
        clearable
      />
      <v-select
        :items="brokers"
        label="Escolha um corretor para te atender"
        v-model="broker"
        clearable
        item-title="name"
        class="my-2"
      />
      <v-select
        :items="['30 minutos', '1 hora', '1 hora e 30 minutos', '2 horas']"
        label='Escolha uma duração para reunião'
        v-model="duration"
        clearable
        class="my-2"
      />
      <v-select
        :items="['online', 'presencial']"
        label="Deseja uma reunião online ou presencial?"
        v-model="meetingPreference"
        clearable
        class="my-2"
      />

      <v-btn @click="openDatePickerDialog" class="my-2" style="width: 100%;">
        Escolher Data
      </v-btn>

      <v-dialog v-model="datePickerDialog" max-width="500">
        <v-card class="pa-5">
          <v-card-title>Escolha a Data da Reunião</v-card-title>

          <template v-if="dialogStep === 1">
            <v-date-picker
              v-model="selectedDate"
              :rules="[rules.required]"
              locale="pt-BR"
              scrollable
            ></v-date-picker>
          </template>


          <template v-if="dialogStep === 2">
            <v-card-text>
              <p>Data selecionada: {{ formatDate(selectedDate,false) }}</p>
            </v-card-text>
          </template>

          <v-card-actions>
            <v-btn @click="handleDialogStep" text width="50%">
              {{ dialogStep === 1 ? 'Cancelar' : 'Voltar' }}
            </v-btn>
            <v-btn @click="handleDialogStep" color="blue" text width="50%">
              {{ dialogStep === 1 ? 'Avançar' : 'Confirmar' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn @click="submitData" block class="mb-5 mx-auto" color="blue" size="large" variant="tonal" type="submit" max-width="50%">
        FAZER AGENDAMENTO
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
import { ref, onMounted, computed } from 'vue';
import Layout from '../../components/layout/index.vue';
import { useUserStore } from '../../stores/user.ts';
import formatDate from '../../utils/formatDate.ts'
import { getBrokers } from '../../actions/schedule.ts';

const store = useUserStore();
const router = useRouter();
const toast = useToast();

const schedulingWithoutRequest = ref(null);
const meetingPreference = ref(null);
const brokers = ref([]);
const broker = ref(null);
const duration = ref(null);
const resume = ref(null);
const role = ref(null);
const name = ref(null);
const selectedDate = ref(null);
const datePickerDialog = ref(false);
const dialogStep = ref(1);

const rules = {
  required: value => !!value || 'Campo obrigatório.'
};

const openDatePickerDialog = () => {
  datePickerDialog.value = true;
};

const closeDatePickerDialog = () => {
  datePickerDialog.value = false;

  dialogStep.value = 1;
};

const handleDialogStep = () => {
  if (dialogStep.value === 1) {

    if (!selectedDate.value) {
      toast.error('Por favor, selecione uma data.');
      return;
    }
    dialogStep.value = 2;
  } else {

    dialogStep.value = 1;
  }
};

const submitData = async () => {
  if (name.value.length === 0 || !selectedDate.value) {
    return toast.error('Por favor, preencha todos os campos.');
  }
  const user = await updateUser({ data: { role: role.value, name: name.value, resume: resume.value || '', schedulingWithoutRequest: schedulingWithoutRequest.value || '', meetingPreference: meetingPreference.value || '', selectedDate: selectedDate.value } });
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

const getData = async () => {
  const response = await getBrokers();
  brokers.value = response;
  console.log(response);
}

onMounted(() => {
  getData();
});

</script>
