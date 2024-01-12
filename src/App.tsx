import { useCounterStore } from "./stores/counter";
import { defineComponent } from "vue";

export const App = defineComponent({
  setup() {
    const store = useCounterStore()

    return () => (
      <v-btn>Hello world - {store.count}</v-btn>
    );
  },
});
