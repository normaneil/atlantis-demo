import { createApp } from "vue";
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";
import Vue3EasyDataTable from "vue3-easy-data-table";
import VueDatePicker from "@vuepic/vue-datepicker";
// import { SelectVue } from "vue3-select2-component";
import vSelect from "vue-select";
import VueSweetalert2 from "vue-sweetalert2";

import "sweetalert2/dist/sweetalert2.min.css";
import "@vuepic/vue-datepicker/dist/main.css";
import "vue3-easy-data-table/dist/style.css";
import "./assets/tailwind.css";
import "./assets/style.css";
import "vue3-toastify/dist/index.css";
import DashboardLayout from "./components/DashboardLayout.vue";
import EmptyLayout from "./components/EmptyLayout.vue";

import App from "./App.vue";
import router from "./router";
const app = createApp(App);

/* Init Pinia */
const pinia = createPinia();

// app.component("SelectVue", SelectVue);
app.component("SelectVue", vSelect);
app.component("VueDatePicker", VueDatePicker);
app.component("EasyDataTable", Vue3EasyDataTable);
app.component("DefaultLayout", DashboardLayout);
app.component("EmptyLayout", EmptyLayout);

app.use(router).use(VueApexCharts).use(VueSweetalert2).use(pinia).mount("#app");
