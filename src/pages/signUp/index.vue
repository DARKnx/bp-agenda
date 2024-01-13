<template>
    <v-text>
        {{ store.user.name }}
    </v-text>
</template>

<script setup>
    import {useUserStore} from '../../stores/user.ts';
    const store = useUserStore()



</script>
