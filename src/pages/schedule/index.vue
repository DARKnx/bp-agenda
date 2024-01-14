<template>
    <Layout>

      <v-main>
          
      </v-main>
    </Layout>
  </template>
  
  <script setup>
  import Layout from '../../components/layout/index.vue';
  import { useUserStore } from '../../stores/user.ts';
  
  const store = useUserStore()

  </script>
  