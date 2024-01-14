<template>
  <Layout>
    <v-list class="custom-list" style="background-color: transparent !important;">
      <v-list-item-group v-if="historic.length">
        <v-list-item v-for="item in historic" :key="item._id" class="my-5 pa-5 rounded"
          style="background-color: #212121;  ">
          <v-list-item-content>
            <v-list-item-title class="mb-3 ml-0" v-html="replaceMessage(item.description)"> </v-list-item-title>
            <v-list-item-subtitle class="">{{ formatDate(item.date) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-subtitle v-else :value="true">Nenhum histórico disponível. </v-subtitle>
    </v-list>
  </Layout>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    import replaceMessage from '../../utils/replaceMessage.ts';
    import { getHistoric } from '../../actions/historic.ts';
    import Layout from '../../components/layout/index.vue';
    import formatDate from '../../utils/formatDate.ts';
    import './index.css';

    const historic = ref([]);

    const getData = async () => {
      historic.value = await getHistoric();
    };

    onMounted(() => {
      getData();
    });
</script>

