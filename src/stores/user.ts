import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

interface User {
  schedulingWithoutRequest: string;
  meetingPreference: string;
  password: string;
  resume: string;
  email: string;
  role: string; 
  name: string;
  date: Date;
}

export const useUserStore = defineStore('user', () => {
    const user = ref<Partial<User>>({});
    const isAuthenticated = ref<boolean>(false);

    return { user, isAuthenticated }
})