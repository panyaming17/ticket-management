<template>
  <a-card title="Ticket List">
    <a-table
      :columns="columns"
      :data-source="tickets"
      :pagination="false"
      row-key="id"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'overtime'">
          <a-tag :color="record.overtime ? 'red' : 'green'">
            {{ record.overtime ? 'Yes' : 'No' }}
          </a-tag>
        </template>
        <template v-if="column.key === 'action' && isAdmin">
          <a-button danger size="small" @click="handleDelete(record.id)">
            Delete
          </a-button>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import type { Ticket } from '../api/mockData'
import { useAuth } from '../composables/useAuth'

defineProps<{
  tickets: Ticket[]
}>()

const emit = defineEmits<{
  delete: [id: string]
}>()

const { isAdmin } = useAuth()

const columns: TableColumnsType = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Project', dataIndex: 'project', key: 'project' },
  { title: 'Overtime', dataIndex: 'overtime', key: 'overtime' },
  { title: 'Hours', dataIndex: 'hours', key: 'hours' },
  { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
  { title: 'Action', key: 'action', width: 100 },
]

const handleDelete = (id: string) => {
  emit('delete', id)
}
</script>
