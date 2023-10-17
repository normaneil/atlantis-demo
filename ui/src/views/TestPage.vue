<script setup lang="ts">
import { onMounted, ref, watch, Ref, computed } from "vue";
import { useMainStore } from "../stores/main";
import { calculateTimeDifference, decimalToTime } from "../_helpers/utils";

const store = useMainStore();

// store.$subscribe(() => {
//   if (store.pusherResponse) {
//     console.log(store.pusherResponse);
//   }
// });

const time = ref("");

onMounted(() => {
  // let timeResult = calculateTimeDifference("23:00:00", "00:00:00");
  // console.log("time", time);
  // time.value = timeResult;
  // time.value = decimalToTime('4.16');
  console.log("4.17", decimalToTime('4.17'));
  console.log("4.16", decimalToTime('4.16'));
  console.log("4.15", decimalToTime('4.15'));
  
});
</script>

<template>
  <div class="p-5">Time: {{ time }}</div>
</template>
