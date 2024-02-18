<script setup >
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
        <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
            <div class="flex items-center justify-center">
                <span class="text-2xl font-semibold text-gray-700"> Home </span>
            </div>
            <div class="mt-6 text-center">
                <RouterLink
                    class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
                    :to="{ name: 'Register' }">
                    User Register
                </RouterLink>
            </div>
            <div class="mt-5">
                <RouterLink class="block text-sm text-indigo-700 fontme hover:underline" :to="{ name: 'Login' }">
                    Admin Login
                </RouterLink>
            </div>
        </div>
    </div>
</template>
