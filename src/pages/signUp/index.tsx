import { defineComponent } from "vue";
import { useUserStore } from "/src/stores/user";
import { useCounterStore } from "/src/stores/counter";

const SignUp = defineComponent({
  setup() {

    const userStore = useUserStore();
    return () => (
        <v-btn>sign up</v-btn>
    );
  },
});

export default SignUp