<template>
  <div class="dashboard">
    <a-layout>
      <a-layout-header class="header">
        <h2>Ticket Management</h2>
        <a-button @click="handleLogout">登出</a-button>
      </a-layout-header>
      <a-layout-content class="content">
        <!-- 加载中 -->
        <a-spin v-if="loading" size="large" class="state-spin" />

        <!-- 数据为空 -->
        <a-empty v-else-if="tickets.length === 0" description="暂无工单数据" />

        <!-- 正常内容 -->
        <a-row v-else :gutter="24">
          <a-col :span="24">
            <TicketTable :tickets="tickets" @delete="handleDelete" />
          </a-col>
          <a-col :span="24" style="margin-top: 24px;">
            <ProjectChart :tickets="tickets" />
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'
import type { Ticket } from '../api/mockData'
import { mockTickets } from '../api/mockData'
import { useAuth } from '../composables/useAuth'
import { computeLoadDelay } from '../utils/loadDelay'
import TicketTable from '../components/TicketTable.vue'
import ProjectChart from '../components/ProjectChart.vue'

const router = useRouter()
const { isLoggedIn, logout } = useAuth()

const loading = ref(true)
const tickets = ref<Ticket[]>([])

onMounted(() => {
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }

  const data = [...mockTickets]
  const delay = computeLoadDelay(data.length)
  const startTime = performance.now()

  console.log(
    `[Dashboard] 数据量: ${data.length} 条 → 加载延时: ${delay}ms`
  )

  setTimeout(() => {
    const elapsed = Math.round(performance.now() - startTime)
    console.log(
      `[Dashboard] 加载完成，实际耗时: ${elapsed}ms`
    )
    tickets.value = data
    loading.value = false
  }, delay)
})

const handleDelete = (id: string) => {
  tickets.value = tickets.value.filter((t) => t.id !== id)
  message.success('工单删除成功')
}

const handleLogout = () => {
  Modal.confirm({
    title: '确认登出',
    content: '确定要退出登录吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      logout()
      router.push('/login')
    },
  })
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;

  h2 {
    margin: 0;
    color: #fff;
  }
}

.content {
  padding: 24px;
  background: #fff;
  min-height: calc(100vh - 64px);
}

.state-spin {
  display: flex;
  justify-content: center;
  padding: 120px 0;
}
</style>
