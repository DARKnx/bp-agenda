<template>
    <v-avatar :color="avatarColor" :size="size">
      <span :style="initialsStyle">{{ initials }}</span>
    </v-avatar>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps(['name', 'size']);
  
  const avatarColor = computed(() => {
    const hash = props.name
      .split('')
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
  });
  
  const initials = computed(() => {
    const words = props.name.split(' ');
    if (words.length >= 2) {
      return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    } else if (words.length === 1) {
      return words[0][0].toUpperCase();
    } else {
      return '';
    }
  });
  
  const initialsStyle = computed(() => ({
    'font-size': `${props.size * 0.4}px`,
    'line-height': `${props.size}px`,
    'color': 'white',
  }));
  </script>
  