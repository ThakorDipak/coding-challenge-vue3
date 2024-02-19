<script setup >
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AUTHENTICATE_API from '@/models/Authentication';
import { onBeforeMount, ref } from 'vue';
import { Form } from 'vee-validate'
import { toast } from "vue3-toastify";


const router = useRouter()
const route = useRoute()

const tokenExpired = ref(false);
const userExpired = ref({ email: null });

const emailVerify = () => {
    if (route.params.token) {
        AUTHENTICATE_API.verification(route.params).then((response) => {
            if (response?.data?.token_expired) {
                tokenExpired.value = true
                userExpired.value = response.data.user
            } else {
                setTimeout(function () {
                    router.push('/');
                }, 2000);
            }
        }).catch(error => {
            if (error.response.data.data.token_invalid) {
                tokenExpired.value = true
            }
        })
    }
}

const resendMail = () => {
    if (userExpired.value?.email == '') {
        return alert('enter Email');
    }
    AUTHENTICATE_API.resendVerifyMail({ email: userExpired.value.email }).then((response) => {
    }).catch(error => {
        if (error.response.data.data.email_invalid) {
            toast.error(error.response.data.message)
            tokenExpired.value = true
        }
    })
}

onBeforeMount(() => {
    emailVerify()
});

</script>

<template>
    <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
        <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
            <div class="flex items-center justify-center">
                <span class="text-2xl font-semibold text-gray-700"> Register Verify </span>
            </div>
            <div class="mt-6 text-center" v-if="tokenExpired">
                <Form class="mt-4" @submit="resendMail()">
                    <div class="flex gap-4">
                        <div>
                            <label class="block mt-3">
                                <input v-model="userExpired.email" type="email" placeholder="Enter Email"
                                    class="block w-full mt-1 border border-gray-500 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                            </label>
                        </div>
                    </div>
                    <button type="submit"
                        class="w-full m-2 px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
                        Resend verification mail
                    </button>
                </Form>
            </div>
        </div>
    </div>
</template>
