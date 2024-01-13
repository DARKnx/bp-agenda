<template>
  <v-app id="inspire">
    <v-app-bar class="px-3 pe-10">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-title class="ms-auto">BP AGENDA</v-title>
    </v-app-bar>

    <v-main>

    </v-main>

    <v-navigation-drawer v-model="drawer">
      <div class="px-3" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; ">
        <div>
          <v-sheet class="pa-6" style="flex-direction: row; display: flex; align-items:  center; justify-content: space-around;">
            <avatar :name="store.user.name" :size="50" />
            <div>
              <div>{{ store.user.name }}</div>
            </div>
          </v-sheet>
          <v-divider></v-divider>


          <v-list>
            <v-list-item
              v-for="[icon, text, route] in links"
              :key="icon"
              :to="route"
              link
              :class="{ 'v-list-item--active': isActiveRoute(route) }"
            >
              <v-list-item-content class="d-flex px-6" style="justify-content: space-between;">
                <v-list-item-icon>
                  <v-icon>{{ icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="">{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>

        <v-list>
          <v-divider></v-divider>
          <v-list-item
            v-for="[icon, text, route] in links2"
            :key="icon"
            :to="route"
            link
            :class="{ 'v-list-item--active': isActiveRoute(route) }"
          >
            <v-list-item-content class="d-flex px-6" style="justify-content: space-between;">
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="">{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../../stores/user.ts';
import Avatar from '../../components/layout/avatar.vue';

const store = useUserStore();

const links = [
  ['mdi mdi-calendar-account', 'Agenda', '/agenda'],
  ['mdi mdi-history', 'Histórico', '/historico'],
];

const links2 = [
  ['mdi mdi-account-box', 'Minha conta', '/minha-conta'],
  ['mdi mdi-cog', 'Configurações', '/configuracoes'],
];

const drawer = ref(null);
const route = useRoute();

const isActiveRoute = (targetRoute) => {
  return computed(() => route.path === targetRoute).value;
};
</script>
