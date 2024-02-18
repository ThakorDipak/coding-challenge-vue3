<script setup >
import * as yup from 'yup';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import AUTHENTICATE_API from '@/models/Authentication';
import { Form, Field, ErrorMessage } from 'vee-validate';

const router = useRouter()

function login() {
  router.push('/dashboard')
}
const route = useRouter();
const loadingIcon = ref(false);
const loginField = reactive({ email: null, password: null });

const Login = () => {
  loadingIcon.value = true;
  AUTHENTICATE_API.authenticate(loginField).then((response) => {
    loadingIcon.value = false;
    route.push({ name: 'Dashboard' })
  }).catch((error) => {
    loadingIcon.value = false;
  })
}

const schema = yup.object({
  email: yup.string().email().required('Please enter email-id'),
  password: yup.string().required('Please enter password'),
});

</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <span class="text-2xl font-semibold text-gray-700">Admin</span>
      </div>

      <Form class="mt-4" :validation-schema="schema" @submit="Login()">
        <label class="block">
          <span class="text-sm text-gray-700">Email</span>
          <Field v-model="loginField.email" name="email" type="email"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
          <ErrorMessage name="email" class="error-text" />

        </label>
        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <Field v-model="loginField.password" type="password" name="password" placeholder="Password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
          <ErrorMessage name="password" class="error-text" />
        </label>
        <div class="mt-6">
          <button type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
