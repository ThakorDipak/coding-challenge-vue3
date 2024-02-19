<script setup >
import { onBeforeMount, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import USER_API from '@/models/User';
import { Form } from 'vee-validate'

const router = useRouter()
const route = useRoute()

const userId = route.params.userId
const userFilter = { id: userId }

const userField = ref({
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    status: null,
    _method: 'PUT',
});

onBeforeMount(() => {
    getUser()
})

const getUser = () => {
    if (userId) {
        USER_API.show(userFilter).then((response) => {
            userField.value = response.user
        })
    }
}

const update = () => {
    if (userId) {
        userField.value._method = 'PUT';
        USER_API.update(userField.value).then((response) => {
            if (response.status) {
                router.push('/dashboard');
            }
        })
    }
}

</script>

<template>
    <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
        <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
            <div class="flex items-center justify-center">
                <span class="text-2xl font-semibold text-gray-700"> Registration </span>
            </div>

            <Form class="mt-4" @submit="update()">
                <!-- {{ userField }} -->
                <div class="flex gap-4">
                    <div>
                        <label class="block">
                            <span class="text-sm text-gray-700">First Name</span>
                            <input v-model="userField.first_name" type="first_name"
                                class="block w-full border mt-1 border-gray-500 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                        </label>
                    </div>
                    <div>
                        <label class="block">
                            <span class="text-sm text-gray-700">Last Name</span>
                            <input v-model="userField.last_name" type="last_name"
                                class="block w-full mt-1 border border-gray-500 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                        </label>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div>
                        <label class="block mt-3">
                            <span class="text-sm text-gray-700">Email</span>
                            <input v-model="userField.email" type="email"
                                class="block w-full mt-1 border border-gray-500 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                        </label>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div>
                        <label class="block mt-3">
                            <span class="text-sm text-gray-700">Status</span>
                            <select v-model="userField.status"
                                class="block w-full mt-1 border border-gray-500 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">

                                <option value="0" disabled>Select status</option>
                                <option value="admin_pending">Admin Pending</option>
                                <option value="block">Block</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div class="mt-6">
                    <button type="submit"
                        class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
                        Submit
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>
