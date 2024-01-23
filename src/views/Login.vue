<template>
    <div class="container">
        <div class="login-form">
            <div class="header">
                Login
            </div>
            <div class="content">
                <form @submit.prevent="onSubmit">
                    <div class="form-content">
                        <span v-if="error" class="err-msg">
                            {{ error }}
                        </span>
                        <div class="input">
                            <Label for="username">
                                Username
                            </Label>
                            <Input v-model="form.username" name="username" placeholder="Username..."/>
                        </div>
                        <div class="input">
                            <Label for="password">
                                Password
                            </Label>
                            <Input v-model="form.password" type="password" name="password" placeholder="Password..."/>
                        </div>
                        <Checkbox name="rememberMe" v-model="form.rememberMe">Remember Me</Checkbox>
                        <Button type="submit" :disabled="!(!!form.username) || !(!!form.password)">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from '@/components/form/Input.vue'
import Label from '@/components/form/Label.vue';
import Button from '@/components/form/Button.vue'
import { reactive, ref, watch } from 'vue';
import { login } from '../auth'
import Checkbox from '@/components/form/Checkbox.vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const form = reactive({
    username: '',
    password: '',
    rememberMe: false
})
const error = ref(null)

const { loginUser, checkLogin } = useAuthStore()
const router = useRouter()

if (checkLogin()) {
    router.push('/')
}

const onSubmit = (e) => {
    login(form.username, form.password).then((data) => {
        loginUser(data, form.rememberMe)
        router.push('/')
    }).catch(err => {
        error.value = err.message
    })
}

watch(form, () => {
    if (error.value) {
        error.value = ""
    }
}, {
    deep: true
})

</script>

<style scoped>
    .login-form {
        border: 1px solid #2d966e;
    }

    .login-form .header {
        height: 10%;
        background-color: #2d966e;
        text-align: center;
        padding: 16px;
        font-size: 24px;
        color: white;
        font-weight: 700;
    }
    .login-form .content {
        margin: 16px 64px;
    }

    .login-form .form-content {
        display: flex;
        flex-direction: column;
    }
    .login-form .input {
        margin: 8px 0px;
    }

    .input:focus-within label {
        color: white;
    }

    .err-msg {
        color: #f35656;
        font-size: 12px;
        width: 100%;
        text-align: center;
        border-radius: 0.25em;
        padding: 12px 16px;
    }

</style>