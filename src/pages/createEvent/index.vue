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
      <v-btn @click="openDatePickerDialog" class="mb-3 py-3" style="width: 100%;  height: auto">
        Escolher a data e horário da reunião 
      </v-btn>
      <v-select
        :items="['online', 'presencial']"
        label="Deseja uma reunião online ou presencial?"
        v-model="meetingPreference"
        clearable
        class="my-2"
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
          :items="availableTimes"
          v-model="selectedTime"
          label="Selecione um horário"
          clearable
          class="my-2"
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
    </div>
  </Layout>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import Layout from '../../components/layout/index.vue';
import { getBrokers, getBrokersSchedule } from '../../actions/schedule.ts';
import formatDate from '../../utils/formatDate.ts';
import { useToast } from 'vue-toastification';
import { getAvailableTimes } from './index.ts';

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
const selectedTime = ref(null);
const datePickerDialog = ref(false);
const dialogStep = ref(1);
const brokerSchedules = ref();
const startWork = '08:00';
const availableTimes = ref(null)
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
  if (name.value.length === 0 || !selectedDate.value || !selectedTime.value) {
    return toast.error('Por favor, preencha todos os campos.');
    datePickerDialog.value = false;
    dialogStep.value = 1;
  }
};


const getData = async () => {
  const response = await getBrokers();
  brokers.value = response;
};

onMounted(() => {
  getData();
});
</script>