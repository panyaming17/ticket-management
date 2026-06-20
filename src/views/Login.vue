<template>
  <div class="login-container">
    <a-card title="Login" :bordered="false" class="login-card">
      <a-form :model="formState" @finish="handleLogin">
        <a-form-item label="Username" name="username">
          <a-input v-model:value="formState.username" placeholder="Enter username" />
        </a-form-item>
        <a-form-item label="Password" name="password">
          <a-input-password v-model:value="formState.password" placeholder="Enter password" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>Login</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formState = reactive({
  username: '',
  password: '',
})

const handleLogin = () => {
  const role = formState.username === 'admin' ? 'admin' : 'user'
  localStorage.setItem('userRole', role)
  router.push('/')
}
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  width: 400px;
}
</style>
