<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
const defaultLayout = 'default'

const { currentRoute } = useRouter()
// console.log(currentRoute.value.meta.layout);

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`,
)

console.log(layout.value);
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
