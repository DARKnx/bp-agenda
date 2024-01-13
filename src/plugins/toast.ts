import toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: false,
};

export { toast, options}