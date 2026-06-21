import { ref, computed } from 'vue'

const role = ref(localStorage.getItem('userRole') || '')

/** 全局认证状态，各组件共享同一份 ref */
export function useAuth() {
  const isAdmin = computed(() => role.value === 'admin')
  const isLoggedIn = computed(() => !!role.value)

  function login(username: string) {
    const r = username === 'admin' ? 'admin' : 'user'
    localStorage.setItem('userRole', r)
    role.value = r
  }

  function logout() {
    localStorage.removeItem('userRole')
    role.value = ''
  }

  return { role, isAdmin, isLoggedIn, login, logout }
}
