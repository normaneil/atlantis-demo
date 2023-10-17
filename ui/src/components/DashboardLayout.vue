<script setup lang="ts">
import { onMounted } from "vue";
onMounted(() => {
  console.log("mounted");
});
</script>

<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="mx-auto p-7">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
