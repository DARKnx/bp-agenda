<template>
    <v-btn @click="toggleTheme">
      <v-icon :color="iconColor">{{ icon }}</v-icon>&nbsp;{{ text }}
    </v-btn>
  </template>
  
  <script setup>
  import { useTheme } from 'vuetify';
  import { ref, onMounted } from 'vue';
  
  const theme = useTheme();
  const iconColor = ref('white');
  const text = ref('Light');
  const icon = ref('mdi mdi-white-balance-sunny');
  
  const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
    localStorage.setItem('theme', theme.global.name.value);
    updateThemeInfo();
  };
  
  const updateThemeInfo = () => {
    icon.value = theme.global.current.value.dark ? 'mdi mdi-white-balance-sunny' : 'mdi mdi-weather-night';
    iconColor.value = theme.global.current.value.dark ? 'white' : 'black';
    text.value = theme.global.current.value.dark ? 'Light' : 'Dark';
  };
  
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      theme.global.name.value = savedTheme;
      updateThemeInfo();
    }
  });
  </script>
  