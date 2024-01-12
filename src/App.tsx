import { useCounterStore } from "./stores/counter";
import api from "./utils/api";
import { defineComponent, onMounted } from "vue";

export const App = defineComponent({
  setup() {
    const store = useCounterStore()
    const getUser = async () => {
        var response = await api.get('/user/get-user');
        console.log(response.data)
    }
    onMounted(() => {
        getUser()
    })


    return () => (
      <v-btn>Hello world - {store.count}</v-btn>
    );
  },
});
