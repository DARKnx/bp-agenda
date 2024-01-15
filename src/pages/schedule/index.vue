<template>
  <Layout>
    <v-main class="ma-10 pa-3" style="background-color: transparent;">
      <v-column justify="space-around">
        <v-btn class="py-5 px-10" variant="tonal" style="height: auto; width: auto;"
                      @click="handleCreateEvent">
                      <v-icon icon="mdi-plus" class="mr-3"/>
                      AGENDAR REUNIÃO
                    </v-btn>

        <v-card class="my-5 pa-5" style="margin: auto; align-items: center;" width="45vw" v-for="day in days"
          :key="day.date">
          <v-card-title>
            {{ day.date }}
          </v-card-title>

          <v-timeline density="compact">
            <v-timeline-item v-for="event in day.events" :key="event._id" size="x-small" :dot-color="event.color">
              <v-card variant="tonal" color="secondary" class="pa-3"
                style="width: auto; min-width: 30vw;  max-width: 40vw; align-items: start; flex-direction: column;">
                <v-card-title class="blue text-left my-0 py-0" :class="['text-h6', `bg-${event.color}`]">
                  <strong>{{ formatDateTime(event.startDate) }} até {{ formatDateTime(event.endDate) }}</strong> - {{
                    event.name }}
                </v-card-title>
                <v-card-text class="text-left text--primary">
                  <div>
                    <p class="mt-5"><strong>descrição: </strong>{{ event.description }}</p>
                    <p class="mt-0"><strong>criado em: </strong>{{ event.createAt }}</p>
                    <p class="mt-0"><strong>solicitador: </strong>{{ event.client }}</p>
                    <p class="mt-0"><strong>corretor: </strong>{{ event.consultant }}</p>
                    <p class="mb-5"><strong>status: </strong>solicitado.</p>
                    <v-btn :color="event.color" variant="outlined" @click="handleActionButtonClick(event)">
                      EDITAR
                    </v-btn>
                    <v-btn v-if="event.status === 'solicited'" class="ml-2" color="green" variant="tonal"
                      @click="handleApproveButtonClick(event)">
                      APROVAR
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card>

        <v-dialog v-model="dialogVisible" max-width="400">
          <v-card>
            <v-card-title>{{ selectedEvent.name }}</v-card-title>
            <v-card-text>
              {{ selectedEvent.description }}
            </v-card-text>
            <v-card-actions>
              <v-btn @click="closeDialog">Fechar</v-btn>

            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-column>
    </v-main>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDate } from 'vuetify';

import Layout from '../../components/layout/index.vue';
import { getSchedule } from '../../actions/schedule.ts';
import formatDate from '../../utils/formatDate.ts';

const days = ref([]);
const adapter = useDate();
const selectedEvent = ref(null);
const dialogVisible = ref(false);

const router = useRouter();

const getData = async () => {
  const response = await getSchedule();
  const groupedByDay = groupEventsByDay(response);
  days.value = groupedByDay;
};

const groupEventsByDay = (events) => {
  const grouped = {};
  events.forEach((event) => {
    const dateKey = formatDate(event.startDate, false);
    if (!grouped[dateKey]) {
      grouped[dateKey] = { date: dateKey, events: [] };
    }

    grouped[dateKey].events.push({
      _id: event._id,
      name: event.name,
      time: adapter.format(event.startDate, 'HH:mm'),
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      createAt: formatDate(event.createAt),
      client: event.client?.name,
      consultant: event.consultant?.name,
      status: 'solicited',
      description: event.description || 'sem descrição.',
      color: event.color || '#2196F3',
    });
  });
  return Object.values(grouped);
};

const handleActionButtonClick = (event) => {
  selectedEvent.value = event;
  dialogVisible.value = true;
};

const handleApproveButtonClick = (event) => {
  alert(`evento: ${event.name} - ID: ${event._id}`);
};

const handleCreateEvent = (event) => {
  router.push('/dashboard/create-event');
};

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const closeDialog = () => {
  dialogVisible.value = false;
};

onMounted(() => {
  getData();
});
</script>
