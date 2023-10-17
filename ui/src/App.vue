<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const defaultLayout = "default";

const { currentRoute } = useRouter();

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);

onMounted(() => {
  const importTE = async () => {
    // @ts-ignore
    await import("tw-elements");
  };
  importTE();
});
</script>
