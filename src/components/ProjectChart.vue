<template>
  <a-card title="Project Hours Distribution">
    <div ref="chartRef" class="chart"></div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { mockTickets } from '../api/mockData'

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getProjectHours = () => {
  const map: Record<string, number> = {}
  mockTickets.forEach((t) => {
    map[t.project] = (map[t.project] || 0) + t.hours
  })
  return { projects: Object.keys(map), hours: Object.values(map) }
}

const initChart = () => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  const { projects, hours } = getProjectHours()
  chart.setOption({
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: projects },
    yAxis: { type: 'value', name: 'Hours' },
    series: [{ type: 'bar', data: hours, itemStyle: { color: '#1677ff' } }],
  })
}

watch(() => mockTickets.length, initChart)

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chart?.resize())
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => chart?.resize())
  chart?.dispose()
})
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
