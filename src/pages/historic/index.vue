<!-- SeuComponente.vue -->

<template>
  <Layout >
    <v-list class="custom-list" style="background-color: transparent !important;">
      <v-list-item-group v-if="historic.length" >
        <v-list-item
          v-for="item in historic"
          :key="item._id"
          class="my-5 pa-5 rounded"
          style="background-color: #212121; display: flex; "
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.description }}</v-list-item-title>
            <v-list-item-subtitle>{{ formatData(item.date) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-alert v-else :value="true" type="info">Nenhum histórico disponível.</v-alert>
    </v-list>
  </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getHistoric } from '../../actions/historic.ts';
import Layout from '../../components/layout/index.vue';

const historic = ref([]);

const getData = async () => {
  historic.value = await getHistoric();
};

onMounted(() => {
  getData();
});

const formatData = (date) => {
  // Adapte essa função conforme necessário para formatar a data como desejado
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.custom-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

</style>
