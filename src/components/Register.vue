<script setup >
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AUTHENTICATE_API from '@/models/Authentication';

const router = useRouter()

const registerProcess = ref(false);
const registerField = reactive({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
});

const register = () => {
    registerProcess.value = true;
    AUTHENTICATE_API.create(registerField).then((response) => {
        registerProcess.value = false;
        registerField.first_name = null
        registerField.last_name = null
        registerField.email = null
        registerField.password = null
    }).catch((error) => {
        registerProcess.value = false;
    })
}

</script>

<template>
    <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
        <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
            <div class="flex items-center justify-center">
                <span class="text-2xl font-semibold text-gray-700"> Registration </span>
            </div>

            <form class="mt-4" @submit.prevent="register">
                <!-- {{ registerField }} -->
                <div class="flex gap-4">
                    <div>
                        <label class="block">
                            <span class="text-sm text-gray-700">First Name</span>
                            <input v-model="registerField.first_name" type="first_name"
                                class="block w-full border mt-1 border-gray-500 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                        </label>
                    </div>
                    <div>
                        <label class="block">
                            <span class="text-sm text-gray-700">Last Name</span>
                            <input v-model="registerField.last_name" type="last_name"
                                class="block w-full mt-1 border border-gray-500 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                        </label>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div>
                        <label class="block mt-3">
                            <span class="text-sm text-gray-700">Email</span>
                            <input v-model="registerField.email" type="email"
                                class="block w-full mt-1 border border-gray-500 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                        </label>
                    </div>
                    <div>
                        <label class="block mt-3">
                            <span class="text-sm text-gray-700">Password</span>
                            <input v-model="registerField.password" type="password"
                                class="block w-full mt-1 border border-gray-500 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                        </label>
                    </div>
                </div>

                <div class="flex items-center justify-between mt-4">
                    <RouterLink class="block text-sm text-indigo-700 fontme hover:underline" :to="{ name: 'Home' }">
                        Back to Home
                    </RouterLink>
                </div>

                <div class="mt-6 " v-if="!registerProcess">
                    <button type="submit"
                        class=" w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
                        Submit
                    </button>
                </div>
                <div class="flex-row space-x-4 w-full" v-if="registerProcess">
                    <div
                        class="w-12 h-12 rounded-full animate-spin border border-dashed border-cyan-500 border-t-transparent">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
