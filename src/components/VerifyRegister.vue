<script setup >
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AUTHENTICATE_API from '@/models/Authentication';
import { onBeforeMount, ref } from 'vue';

const router = useRouter()
const route = useRoute()

const tokenExpired = ref(false);
const userExpired = ref({});

const emailVerify = () => {
    if (route.params.token) {
        console.log(route.params);
        AUTHENTICATE_API.verification(route.params).then((response) => {
            if (response?.data?.token_expired) {
                tokenExpired.value = true
                userExpired.value = response.data.user
            }
            console.log(response);
        })
    }
}

const resendMail = () => {
    AUTHENTICATE_API.resendVerifyMail({ email: userExpired.value.email }).then((response) => {
        console.log(response);
    })
}

onBeforeMount(() => {
    emailVerify()
});

console.log(route.params);
</script>

<template>
    <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
        <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
            <div class="flex items-center justify-center">
                <span class="text-2xl font-semibold text-gray-700"> Register Verify </span>
            </div>
            <div class="mt-6 text-center" v-if="tokenExpired">
                <!-- <RouterLink
                    class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
                    :to="{ name: 'Register' }">
                    Resend verification mail
                </RouterLink> -->
                <button @click="resendMail()"
                    class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
                    Resend verification mail
                </button>
            </div>
        </div>
    </div>
</template>
