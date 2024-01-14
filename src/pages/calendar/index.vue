<template>
  <Layout>
    <v-main class="ma-10 pa-3" style="background-color: transparent;">
      <v-sheet tile class="d-flex" style="background-color: transparent;">
        <v-select v-model="type" :items="types" dense variant="outlined" hide-details class="mb-5 mx-2"
          label="Modo de Visualização"></v-select>
        <v-select v-model="weekday" :items="weekdays" dense variant="outlined" hide-details label="Dias da Semana"
          class="mb-5 mx-2"></v-select>
      </v-sheet>
      <v-sheet style="background-color: transparent;">
        <v-calendar ref="calendar" v-model="value" :weekdays="weekday" :view-mode="type" :events="schedules"
          class="calendar-container"></v-calendar>
      </v-sheet>
    </v-main>
  </Layout>
</template>


<script setup>
    import { ref, onMounted } from 'vue';
    import { useDate } from 'vuetify';

    import randomColor from '../../utils/getRandomColor.ts';
    import { getSchedule } from '../../actions/schedule.ts';
    import Layout from '../../components/layout/index.vue';
    import './index.css'

    const types = ['month', 'week', 'day'];
    const weekdays = [
      { title: 'Dom - Sáb', value: [0, 1, 2, 3, 4, 5, 6] },
      { title: 'Seg - Dom', value: [1, 2, 3, 4, 5, 6, 0] },
      { title: 'Seg - Sex', value: [1, 2, 3, 4, 5] },
      { title: 'Seg, Qua, Sex', value: [1, 3, 5] },
    ];

    const schedules = ref([]);
    const adapter = useDate();


    const getData = async () => {
      const response = await getSchedule();
      const transformedEvents = response.map(event => ({
        title: event.name,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
        color: randomColor(),
        allDay: false, 
      }));
      schedules.value = transformedEvents;
    };

    onMounted(() => {
      getData();
    });

    const type = ref('month');
    const weekday = ref(weekdays[0].value);
    const value = ref([new Date()]);
</script>