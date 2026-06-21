<template>
  <div class="login-container">
    <a-card title="Login" :bordered="false" class="login-card">
      <a-form
        :model="formState"
        :rules="rules"
        :label-col="{ style: { width: '70px' } }"
        :wrapper-col="{ flex: 1 }"
        @finish="handleLogin"
        @finishFailed="handleLoginFailed"
      >
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formState.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="密  码" name="password">
          <a-input-password
            v-model:value="formState.password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block :loading="loading">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login: doLogin } = useAuth()

interface LoginForm {
  username: string
  password: string
}

const loading = ref(false)

const formState = reactive<LoginForm>({
  username: '',
  password: '',
})

/** 表单校验规则 */
const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'change' },
  ],
}

/** 提交登录（校验通过后触发） */
const handleLogin = (values: LoginForm) => {
  loading.value = true

  doLogin(values.username)
  message.success('登录成功')
  loading.value = false
  router.push('/')
}

/** 校验失败回调 */
const handleLoginFailed = () => {
  message.error('请检查输入信息')
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
