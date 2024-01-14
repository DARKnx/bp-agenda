<template>
  <v-app id="inspire">
    <v-app-bar class="px-3 pe-10">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-title class="ms-auto text-h6 font-weight-bold" :style="{ color: $vuetify.theme.themes.light.colors.primary }">
        RESERVA
        <span class="ms-auto text-h6 font-weight-black"
          :style="{ color: $vuetify.theme.themes.light.colors.secondary }">BP</span>
      </v-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <div class="px-3" style="display: flex; height: 100%; flex-direction: column; justify-content: space-between;">
        <div>
          <v-sheet class="pa-6"
            style="flex-direction: row; display: flex; align-items:  center; justify-content: space-around;">
            <avatar :name="store.user.name" :size="50" />
            <div>
              <v-text class="text-subtitle font-weight-bold">
                {{ formatName(store.user.name, true) }}
              </v-text>
            </div>
          </v-sheet>
          <v-divider></v-divider>

          <v-list>
            <v-list-item class="my-1" v-for="[icon, text, route] in defaultLinks" :key="icon" :to="route" link
              :class="{ 'v-list-item--active': route === currentRoute }">
              <v-list-item-content class="d-flex px-6">
                <v-list-item-icon class="pr-5">
                  <v-icon>{{ icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="">{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>

        <v-list class="pb-4">
          <v-divider class="py-2"></v-divider>
          <v-list-item v-for="[icon, text, route] in settingsLinks" :key="icon" :to="route" link
            :class="{ 'v-list-item--active': route === currentRoute }">
            <v-list-item-content class="d-flex px-6">
              <v-list-item-icon class="pr-5">
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="">{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-main style="overflow-y: auto; height: 100vh; ">
      <v-container fluid class="custom-container fill-height">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>



<script setup>
    import { ref, watchEffect } from 'vue';
    import { useRoute } from 'vue-router';

    import { useUserStore } from '../../stores/user.ts';
    import formatName from '../../utils/formatName.ts';
    import Avatar from '../avatar/index.vue';
    import './index.css'

    const store = useUserStore();
    const drawer = ref(null);
    const route = useRoute();
    const currentRoute = ref(route.path);

    const defaultLinks = [
      ['mdi mdi-calendar-account', 'Agenda', '/dashboard/schedule'],
      ['mdi mdi-history', 'Histórico', '/dashboard/historic'],
    ];

    const settingsLinks = [
      ['mdi mdi-account-box', 'Minha conta', '/dashboard/profile'],
      ['mdi mdi-logout', 'Sair', '/logout'],
    ];

    watchEffect(() => {
      currentRoute.value = route.path;
    });
</script>
