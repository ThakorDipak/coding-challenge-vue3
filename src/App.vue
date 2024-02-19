<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
const defaultLayout = 'default'

const { currentRoute } = useRouter()

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`,
)

</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
