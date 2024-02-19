<script setup>
import USER_API from "@/models/User.js";
import Paginate from "@/components/Paginate.vue";
import { onBeforeMount, ref, reactive } from "vue";

const userList = ref({});
const pagination = ref({});
const bulkStatusIds = ref({ status_update: [] });
const bulkDeleteIds = ref([]);
const UserFilter = reactive({ page: null, search: null, paginate: null, sort_by: null });

const getUsers = () => {
  USER_API.get(UserFilter).then((response) => {
    console.log(response.users);
    userList.value = response.users.data;
    pagination.value = response.users.pagination;
  });
};

onBeforeMount(() => {
  getUsers();
});

const search = () => {
  getUsers();
};

const showByPagination = (eventPage) => {
  UserFilter.page = eventPage;
  getUsers();
};

const showRecodeTotal = (totalRecode) => {
  UserFilter.paginate = totalRecode;
  getUsers();
};

const sorting = (sortBy) => {
  UserFilter.sort_by = sortBy;
  console.log(123);
  getUsers();
};

const removeFilter = () => {
  UserFilter.search = null;
  UserFilter.paginate = null;
  UserFilter.sort_by = null;
  getUsers();
};

const bulkStatus = () => {
  if (Array.isArray(bulkStatusIds.value.status_update)) {
    USER_API.bulkUserStatusUpdate(bulkStatusIds.value).then((response) => {
      console.log(response);
      getUsers();
    });
  }
};

const bulkDelete = () => {
  const tempIds = { destroy_ids: bulkDeleteIds.value };
  if (Array.isArray(bulkDeleteIds.value) && tempIds.length !== 0) {
    USER_API.bulkUserDestroy(tempIds).then((response) => {
      console.log(response);
      getUsers();
    });
  }
};

const userDelete = (user) => {
  if (confirm("Are you sure you want to delete this user?")) {
    USER_API.destroy(user).then((response) => {
      getUsers();
    });
  }
};
</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>
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
        <input v-model="UserFilter.search" v-on:keyup.enter="search()" type="text" placeholder="Search"
          class="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
      </div>
    </div>
    <button @click="removeFilter()"
      class="px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Remove
      Filter
    </button>

    <div class="mt-8" />
    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 relative">
                  First Name
                  <button @click="sorting('first_name')"
                    class="absolute top-0 right-0 mt-2 mr-2 text-sky-400">short</button>
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 relative">
                  Last Name
                  <button v-on:click="sorting('last_name')"
                    class="absolute top-0 right-0 mt-2 mr-2 text-sky-400">short</button>
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 relative">
                  email
                  <button v-on:click="sorting('email')"
                    class="absolute top-0 right-0 mt-2 mr-2 text-sky-400">short</button>
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 relative">
                  Status
                  <button v-on:click="bulkStatus()"
                    class="px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Bulk
                    Update</button>
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 relative">
                  Delete
                  <button v-on:click="bulkDelete()"
                    class="px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Bulk
                    Delete</button>
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 relative">
                  Action</th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(user, index) in userList" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-center">
                    {{ user.first_name }}
                  </div>
                </td>

                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-center">
                    {{ user.last_name }}
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
                      class="inline-flex px-2 mb-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      {{ user.status }}
                    </span>
                    <div class="gap-3">
                      <div>
                        <input type="radio" id="huey" :name="'status_' + index" value="admin_pending" @click="(e) => {
                          bulkStatusIds.status_update[user.id] = { id: user.id, status: 'admin_pending' };
                        }" />
                        <label for="huey">Admin Pending</label>
                      </div>
                      <div>
                        <input type="radio" id="dewey" :name="'status_' + index" value="block" @click="(e) => {
                          bulkStatusIds.status_update[user.id] = { id: user.id, status: 'block' };
                        }
                          " />
                        <label for="dewey">Block</label>
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 text-sm font-medium leading-5 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-center">
                    <input type="checkbox" :name="'delate' + index" :checked="false" :true-value="1" :false-value="0"
                      v-on:change="(e) => {
                        if (e.target.checked) {
                          bulkDeleteIds[index] = user.id;
                        } else {
                          delete bulkDeleteIds[index];
                        }
                      }" class="w-5 h-5 text-indigo-600 rounded-md focus:ring-indigo-500" name="status" />
                  </div>
                </td>

                <td class="px-6 py-4 text-sm font-medium leading-5 border-b border-gray-200 whitespace-nowrap">
                  <RouterLink :to="{ name: 'UserEdit', params: { userId: user.id } }"
                    class="text-indigo-600 hover:text-indigo-900 font-bold"> Edit </RouterLink>

                  <button @click="userDelete(user)"
                    class="text-orange-500 hover:text-orange-600 font-bold ml-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <Paginate :pagination="pagination" @paginationShow="showByPagination($event)"
            @showTotalRecode="showRecodeTotal($event)" />
        </div>
      </div>
    </div>
  </div>
</template>
