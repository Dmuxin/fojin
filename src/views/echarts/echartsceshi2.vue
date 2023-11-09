<template>
  <div>
    <div ref="chartColumn" style="width:100%; height:400px;" />
    <button @click="changeOption">点击改变内容</button>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      chartColumn: null,
      option: {
        title: {
          text: '普通图表'
        },
        legend: {
          orient: 'vertical',
          bottom: 10,
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20, 5, 20, 36, 10]
    }
  },
  mounted: function() {
    this.initChart()
  },
  methods: {
    changeOption() {
      var r = Math.floor(Math.random() * 12)
      // splice会改变原来的数组
      // var data = this.data.splice(r,6);
      var d = this.data.slice(r, r + 6)
      this.option.series[0].data = d
      this.chartColumn.setOption(this.option)
    },

    initChart() {
      this.chartColumn = echarts.init(this.$refs.chartColumn)
      this.chartColumn.setOption(this.option)
    }
  }
}
</script>
