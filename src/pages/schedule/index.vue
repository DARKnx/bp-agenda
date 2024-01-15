<template>
  <Layout>
    <v-main class="ma-10 pa-3" style="background-color: transparent;">
      <v-column justify="space-around">

        <v-card class="my-5 pa-5" style="margin: auto; align-items: center;" width="70vw" v-for="day in days"
          :key="day.date">
          <v-card-title>
            {{ day.date }}
          </v-card-title>

          <v-timeline density="compact">
            <v-timeline-item 
              v-for="event in day.events"
              :key="event._id"
              size="x-small"
              :dot-color="event.color"
              @click="handleTimelineItemClick(event)"
            >
              <v-card  variant="tonal" color="secondary"  class="pa-3" style="width: auto; min-width: 30vw;  max-width: 55vw; align-items: start; flex-direction: column;">
                <v-card-title class="blue text-left my-0 py-0" :class="['text-h6', `bg-${event.color}`]">
                  <strong>{{ formatDateTime(event.startDate) }} até {{ formatDateTime(event.endDate) }}</strong> - {{ event.name }}
                </v-card-title>
                <v-card-text class="text-left text--primary">
                  <div>
                    <p class="mt-5"><strong>descrição: </strong>{{ event.description }}</p>
                    <p class="mt-0"><strong>criado em: </strong>{{ event.createAt }}</p>
                    <p class="mt-0"><strong>solicitador: </strong>{{ event.client }}</p>
                    <p class="mt-0"><strong>corretor: </strong>{{ event.consultant }}</p>
                    <p class="mb-5"><strong>status: </strong>solicitado.</p>
                    <v-btn
                      :color="event.color"
                      variant="outlined"
                      @click="handleActionButtonClick(event)"
                    >
                      ABRIR
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-column>
    </v-main>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDate } from 'vuetify';
import Layout from '../../components/layout/index.vue';
import { getSchedule } from '../../actions/schedule.ts';
import formatDate from '../../utils/formatDate.ts'
import './index.css';

const days = ref([]);
const adapter = useDate();

const getData = async () => {
  const response = await getSchedule();
  const groupedByDay = groupEventsByDay(response);
  days.value = groupedByDay;
};

const groupEventsByDay = (events) => {
  const grouped = {};
  events.forEach((event) => {
    const dateKey = formatDate(event.startDate, false)
    if (!grouped[dateKey]) {
      grouped[dateKey] = { date: dateKey, events: [] };
    }

    // Ajuste para definir hora e minuto como 00:00
    const startDate = new Date(event.startDate);


    const endDate = new Date(event.endDate);

    grouped[dateKey].events.push({
      _id: event._id,
      name: event.name,
      time: adapter.format(event.startDate, 'HH:mm'),
      startDate: startDate,
      endDate: endDate,
      createAt: formatDate(event.createAt),
      client: event.client?.name,
      consultant: event.consultant?.name,
      description: event.description || 'sem descrição.',
      color: event.color || '#2196F3',
    });
  });
  return Object.values(grouped);
};

const handleActionButtonClick = (event) => {
  alert(`Clicou no botão de ação para ${event.name} - ID: ${event._id}`);
};

const handleTimelineItemClick = (event) => {
  alert(`Clicou na linha do tempo para ${event.name} - ID: ${event._id}`);
};

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};


onMounted(() => {
  getData();
});
</script>
