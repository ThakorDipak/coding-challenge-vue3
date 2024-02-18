<script setup>
import { computed } from 'vue';

const PROPS = defineProps({
  pagination: Object,
  showTotalRecode: Function,
});

const emit = defineEmits(["paginationShow", "showTotalRecode"]);

const showByPagination = (page) => {
  emit("paginationShow", page);
};

const showRecodeTotal = (event) => {
  const totalRecode = event.target.value
  emit("showTotalRecode", totalRecode);
};

const visiblePages = computed(() => {
  const currentPage = PROPS.pagination.current_page
  const lastPage = PROPS.pagination.last_page
  const numVisiblePages = 7 // Number of visible page links including current page

  let startPage = Math.max(currentPage - 3, 1)
  let endPage = Math.min(startPage + numVisiblePages - 1, lastPage)

  if (endPage - startPage < numVisiblePages - 1) {
    startPage = Math.max(endPage - numVisiblePages + 1, 1)
  }
  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)
})
</script>
<template>
  <div
    class="flex flex-col justify-between px-4 py-4 space-y-4 text-white bg-dark sm:flex-row sm:items-center sm:space-y-0 sm:px-5">
    <div class="flex items-center space-x-2 text-xs+ ">
      <span>Show</span>
      <label class="block ">
        <select v-on:change="showRecodeTotal($event)"
          class="px-2 py-1 pr-6 bg-[#191e3a] border rounded-full form-select border-slate-800 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:bg-navy-700 dark:hover:border-navy-400 dark:focus:border-accent">
          <option value="5">5</option>
          <option selected value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </label>
      <span>entries</span>
    </div>

    <ol class="flex font-medium bg-[#191e3a] rounded-xl">
      <li class="rounded-l-lg bg-slate-150 dark:bg-navy-500">
        <button v-on:click="showByPagination(pagination.current_page - 1)" :disabled="pagination.current_page == 1"
          class="flex items-center justify-center w-8 h-8 transition-colors rounded-lg text-slate-500 hover:hover:text-sky-500 focus:hover:text-sky-500 active:hover:text-sky-500/80 dark:text-navy-200 dark:hover:bg-gray-800 dark:focus:bg-navy-450 dark:active:bg-navy-450/90">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7">
            </path>
          </svg>
        </button>
      </li>
      <li v-for="(page, index) in visiblePages" :key="index" class="bg-slate-150 dark:bg-navy-500">
        <button :class="{
          'flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-3 leading-tight transition-colors hover:hover:text-sky-500 focus:hover:text-sky-500 active:hover:text-sky-500/80 dark:hover:bg-gray-800 dark:focus:bg-navy-450 dark:active:bg-navy-450/90': true,
          'bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400': pagination.current_page == page
        }" v-on:click="showByPagination(page)">
          {{ page }}
        </button>
      </li>
      <li class="rounded-r-lg bg-slate-150 dark:bg-navy-500">
        <button v-on:click="showByPagination(pagination.current_page + 1)"
          :disabled="pagination.last_page == pagination.current_page"
          class="flex items-center justify-center w-8 h-8 transition-colors rounded-lg text-slate-500 hover:hover:text-sky-500 focus:hover:text-sky-500 active:hover:text-sky-500/80 dark:text-navy-200 dark:hover:bg-gray-800 dark:focus:bg-navy-450 dark:active:bg-navy-450/90">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </li>
    </ol>

    <div class="text-xs+">
      {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries
    </div>
  </div>
</template>
