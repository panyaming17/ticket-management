<template>
  <a-card title="Project Hours Distribution">
    <div v-if="props.tickets.length === 0" class="chart-empty">
      <a-empty description="暂无数据" />
    </div>
    <div v-else ref="chartRef" class="chart"></div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import type { Ticket } from '../api/mockData'

const props = defineProps<{
  tickets: Ticket[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

/** 用 computed 替代 watch+deep，只在依赖变化时重算 */
const chartData = computed(() => {
  const map: Record<string, number> = {}
  props.tickets.forEach((t) => {
    map[t.project] = (map[t.project] || 0) + t.hours
  })
  return { projects: Object.keys(map), hours: Object.values(map) }
})

const initChart = () => {
  if (!chartRef.value) return
  if (!chart) {
    chart = echarts.init(chartRef.value)
  }
  const { projects, hours } = chartData.value
  chart.setOption({
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: projects },
    yAxis: { type: 'value', name: 'Hours' },
    series: [{ type: 'bar', data: hours, itemStyle: { color: '#1677ff' } }],
  })
}

const handleResize = () => {
  chart?.resize()
}

// 仅监听 chartData 引用变化，比 deep watch 整个 tickets 数组高效
watch(chartData, () => initChart())

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 400px;
}

.chart-empty {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
