<template>
  <div class="dashboard">
    <a-layout>
      <a-layout-header class="header">
        <h2>Ticket Management</h2>
        <a-button @click="handleLogout">Logout</a-button>
      </a-layout-header>
      <a-layout-content class="content">
        <a-row :gutter="24">
          <a-col :span="24">
            <TicketTable />
          </a-col>
          <a-col :span="24" style="margin-top: 24px;">
            <ProjectChart />
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import TicketTable from '../components/TicketTable.vue'
import ProjectChart from '../components/ProjectChart.vue'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('userRole')
  router.push('/login')
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
</style>
