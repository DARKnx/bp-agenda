  <template>
    <Loading/>
  </template>
  
  <script setup>
        import { useRouter } from 'vue-router';
        import Loading from '../../components/loading/index.vue';
        import { useUserStore } from '../../stores/user.ts';
        
        const store = useUserStore();
        const router = useRouter();
        
        const resetAndRedirect = async () => {
            localStorage.clear();
            store.$patch({
            user: {},
            isAuthenticated: false
            });
        
            setTimeout(() => {
                 router.push('/');
            }, 300);
        };
        
        resetAndRedirect();
  </script>