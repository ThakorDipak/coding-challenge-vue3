<script setup>
import { ref } from 'vue'

const testUser = {
  name: 'John Doe',
  email: 'john@example.com',
  title: 'Software Engineer',
  title2: 'Web dev',
  status: 'Active',
  role: 'Owner',
}

const BulkStatus = [];
const BulkDelete = [];

const users = ref([...Array(5).keys()].map(() => testUser))
</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700"> Dashboard </h3>
    <div class="flex items-center">

      <button class="text-gray-500 focus:outline-none lg:hidden" @click="isOpen = true">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <div class="relative mx-4 lg:mx-0">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <input
          class="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          type="text" placeholder="Search">
      </div>
    </div>


    <div class="mt-8" />
    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          {{ BulkStatus }}
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 relative">
                  Name
                  <button class="absolute top-0 right-0 mt-2 mr-2 text-sky-400">short</button>
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 relative  ">
                  email
                  <button class="absolute top-0 right-0 mt-2 mr-2 text-sky-400">short</button>
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 relative  ">
                  Status
                  <button
                    class="px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                    Status Update
                  </button>
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 relative  ">
                  Delete
                  <button
                    class="px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                    Bulk Delete
                  </button>
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 relative  ">
                  Action
                </th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(user, index) in users" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-center">
                    {{ user.name }}
                  </div>
                </td>

                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-center">
                    {{ user.email }}
                  </div>
                </td>

                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-center">
                    <span
                      class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      {{ user.status }}
                    </span>
                    <input type="checkbox" :name="'status' + index" :value="BulkStatus[index]"
                      class="w-5 h-5 text-indigo-600 rounded-md focus:ring-indigo-500" name="status">
                  </div>
                </td>

                <td class="px-6 py-4 text-sm font-medium leading-5 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-center">
                    <input type="checkbox" :name="'delate' + index" :value="BulkDelete[index]"
                      class="w-5 h-5 text-indigo-600 rounded-md focus:ring-indigo-500" name="status">
                  </div>
                </td>

                <td class="px-6 py-4 text-sm font-medium leading-5 border-b border-gray-200 whitespace-nowrap">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>
