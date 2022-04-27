<template>
  <div class="main" ref="main">
  </div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    props: {
      echartsData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        myChart: null,
      }
    },
    watch:{
      echartsData(newValue){
        newValue.length>0 ? this.info() : ''
      }
    },
    methods: {
      info() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(this.$refs.main);
        // 绘制图表
        let option = {
          tooltip: {
            trigger: 'item'
          },
          series: [{
            name: 'Access From',
            type: 'pie',
            radius: '40%',
            center: ['50%', '50%'],
            data: this.echartsData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };

        option && this.myChart.setOption(option);
      }
    }
  }
</script>

<style scoped="scoped">
  .main {
    width: 100%;
    height: 400px;
  }
</style>
