<template>
  <Layout>
    <div style="width: 50%; margin: auto;">
      <v-text-field 
        v-model="name" 
        label="Titulo" 
        class="my-2"
        prepend-inner-icon="mdi mdi-alphabetical-variant"
        :rules="[rules.required]"
        clearable 
      />
      <v-textarea
        v-model="description" 
        label="Descrição"
        class="my-2"
        prepend-inner-icon="mdi mdi-text-account"
        :rules="[rules.required]"
        variant="filled"
        auto-grow
        clearable
      />
      <v-select
        v-model="broker"
        label="Escolha um corretor para te atender"
        class="my-2"
        :items="brokers"
        clearable
        item-title="name"
      />
      <v-select
        v-model="duration"
        label='Escolha uma duração para reunião'
        class="my-2"
        :items="['30 minutos', '1 hora', '1 hora e 30 minutos', '2 horas']"
        clearable
      />
      <v-btn @click="openDatePickerDialog" class="mb-3 py-3" style="width: 100%;  height: auto">
        Escolher a data e horário da reunião 
      </v-btn>
      <v-select
        v-model="meetingPreference"
        label="Deseja uma reunião online ou presencial?"
        class="my-2"
        :items="['online', 'presencial']"
        clearable
      />

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
              <p>Data selecionada: {{ formatDate(selectedDate, false) }}</p>
              <p>Horários disponíveis:</p>
              <v-select
                v-if="availableTimes && availableTimes.length > 0"
                v-model="selectedTime"
                label="Selecione um horário"
                class="my-2"
                :items="availableTimes"
                clearable
              ></v-select>
              <p v-else>Nenhum horário disponível para esta data.</p>
            </v-card-text>
          </template>

          <v-card-actions>
            <v-btn @click="closeDatePickerDialog" text width="50%">
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

      <v-btn @click="handleCancel" block class="mb-5 mx-auto" color="red" size="large" variant="tonal" type="submit" max-width="50%">
        CANCELAR
      </v-btn>
    </div>
  </Layout>
</template>

<script setup>
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

import { getBrokers, getBrokersSchedule, createSchedule } from '../../actions/schedule.ts';
import { getAvailableTimes, combineDateTime} from './index.ts';
import Layout from '../../components/layout/index.vue';
import { useUserStore } from '../../stores/user.ts';
import formatDate from '../../utils/formatDate.ts';

const store = useUserStore();
const router = useRouter();
const toast = useToast();

const meetingPreference = ref(null);
const datePickerDialog = ref(false);
const availableTimes = ref(null);
const selectedDate = ref(null);
const selectedTime = ref(null);
const brokerSchedules = ref();
const description = ref(null);
const duration = ref(null);
const dialogStep = ref(1);
const broker = ref(null);
const name = ref(null);
const brokers = ref([]);

const startWork = '08:00';
const endWork = '18:00';

const rules = {
  required: value => !!value || 'Campo obrigatório.',
};

const openDatePickerDialog = () => {
  if (!broker.value) return toast.error('Por favor, selecione um corretor.');
  if (!duration.value) return toast.error('Por favor, selecione uma duração.');
  datePickerDialog.value = true;
};

const closeDatePickerDialog = () => {
  if (dialogStep.value === 1) return datePickerDialog.value = false;
  dialogStep.value = 1;
};

const handleDialogStep = async () => {
  if (dialogStep.value === 1) {
    if (!selectedDate.value) return toast.error('Por favor, selecione uma data.');
    dialogStep.value = 2;
    const selectedBroker = brokers.value.find(b => b.name == broker.value);
    const response = await getBrokersSchedule({ id: selectedBroker._id, date: selectedDate.value });
    brokerSchedules.value = response;
    var times = getAvailableTimes(selectedDate.value, response, duration.value, '08:00', '18:00')
    availableTimes.value = times.map(x => `${x.start} até ${x.end}`)
  } else {
    if (!selectedTime.value) return toast.error('Por favor, selecione uma horário.');
    toast.success('Horário selecionado com sucesso.');
    datePickerDialog.value = false;
    dialogStep.value = 1;
    
  }
};

const submitData = async () => {
  if (name.value?.length === 0 || description.value?.length === 0 || !selectedDate.value || !selectedTime.value || !meetingPreference.value) {
    return toast.error('Por favor, preencha todos os campos.');
  }
  const selectedBroker = brokers.value.find(b => b.name == broker.value);
  const startEnd = selectedTime.value.replace('até ', '').split(' ');
  var response = await createSchedule({
    startDate: combineDateTime(selectedDate.value, startEnd[0]), 
    endDate: combineDateTime(selectedDate.value, startEnd[0]),
    consultant: {
      name: selectedBroker.name,
      id: selectedBroker._id
    },
    client:{
      name: store.user.name,
      id: store.user._id
    },
    description: description.value, 
    name: name.value, 
    status: selectedBroker.schedulingWithoutRequest == 'sim' ? 'solicitado' : 'aprovado'
  });
  if (response?.error) return toast.error(response.error);
  toast.success('Agendamento criado com sucesso.');
  router.push('/dashboard/schedule')
};

const handleCancel = () => {
  toast.success('Agendamento cancelado com sucesso.');
  router.push('/dashboard/schedule')
};

const getData = async () => {
  const response = await getBrokers();
  brokers.value = response;
};

const checkUserRole = () => {
  if (store.user.role != 'cliente'){
    toast.error('Apenas clientes podem criar agendamentos.');
    router.push('/dashboard/schedule');
  }
}

onMounted(() => {
  checkUserRole();
  getData();
});
</script>
