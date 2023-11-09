<template>
  <div id="building">
    <body>
      <el-header>
        <h1>数据可视化</h1>
        <div class="showTime">{{ currentTime }}</div>
      </el-header>
      <section class="mainbox">
        <div class="column">
          <div class="panel bar">
            <h2>柱形图-应用行业</h2>
            <div ref="bar1" class="chart" />
            <div class="panel-footer" />
          </div>
          <div class="panel line">
            <h2>
              折线图-人员变化 <a href="javacript:;">2020</a><a href="javascript:;">2021</a>
            </h2>
            <div ref="line1" class="chart">图表</div>
            <div class="panel-footer" />
          </div>
          <div class="panel pie">
            <h2>饼形图-年龄分布</h2>
            <div ref="pie1" class="chart">图表</div>
            <div class="panel-footer" />
          </div>
        </div>
        <div class="column">
          <!-- no模块制作 -->
          <div class="no">
            <div class="no-hd">
              <ul>
                <li>125811</li>
                <li>100</li>
              </ul>
            </div>
            <div class="no-bd">
              <ul>
                <li>总抄写次数</li>
                <li>今日抄写次数</li>
              </ul>
            </div>
          </div>
          <!-- 地图模块 -->

        </div>
        <div class="column">
          <div class="panel bar2">
            <h2>各项功效使用率</h2>
            <div ref="bar2" class="chart">图表</div>
            <div class="panel-footer" />
          </div>
          <div class="panel line2">
            <h2>折线图-使用量</h2>
            <div ref="line2" class="chart">图表</div>
            <div class="panel-footer" />
          </div>
          <div class="panel pie2">
            <h2>饼形图-地区分布</h2>
            <div ref="pie2" class="chart">图表</div>
            <div class="panel-footer" />
          </div>
        </div>
      </section>
    </body>
  </div>
</template>
      <style>
</style>
<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      zhu: [712, 350, 610, 793, 664],
      timer: '', // 定义一个定时器的变量
      currentTime: new Date(), // 获取当前时间
      chartColumn: null,
      chart4: null,
      option: {
        color: ['#2f89cf'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // 修改图表的大小
        grid: {
          left: '0%',
          top: '10px',
          right: '0%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '旅游行业',
              '教育培训',
              '游戏行业',
              '医疗行业',
              '福利院',
              '社交行业',
              '金融行业'
            ],
            axisTick: {
              alignWithLabel: true
            },
            // 修改刻度标签 相关样式
            axisLabel: {
              color: 'rgba(255,255,255,.6) ',
              fontSize: '12'
            },
            // 不显示x坐标轴的样式
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // 修改刻度标签 相关样式
            axisLabel: {
              color: 'rgba(255,255,255,.6) ',
              fontSize: 12
            },
            // y轴的线条改为了 2像素
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 2
              }
            },
            // y轴分割线的颜色
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '35%',
            data: [200, 300, 300, 900, 1500, 1200, 600],
            itemStyle: {
              // 修改柱子圆角
              barBorderRadius: 5
            }
          }
        ]
      }
    }
  },

  created() {
    var vm = this
    vm.timer = setInterval(() => {
      var y = new Date().getFullYear()
      var m = vm.appendZero(new Date().getMonth() + 1)
      var d = vm.appendZero(new Date().getDate())
      var ho = vm.appendZero(new Date().getHours())
      var mi = vm.appendZero(new Date().getMinutes())
      var s = vm.appendZero(new Date().getSeconds())
      // 修改数据date
      vm.currentTime =
        y + '/' + m + '/' + d + ' ' + ho + ':' + mi + '分' + s + '秒'
    }, 1000)
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  mounted: function() {
    this.initChart3()
    this.initChart()
    this.initChart2()
    this.initChart4()
    this.initChart5()
    this.initChart6()
  },
  methods: {
    // 时间过滤加0
    appendZero(obj) {
      if (obj < 10) {
        return '0' + obj
      } else {
        return obj
      }
    },
    changeOption() {
      var r = Math.floor(Math.random() * 12)
      // splice会改变原来的数组
      // var data = this.data.splice(r,6);
      var d = this.data.slice(r, r + 6)
      this.option.series[0].data = d
      this.chartColumn.setOption(this.option)
    },

    initChart() {
      // 3. 把配置给实例对象
      this.chartColumn = echarts.init(this.$refs.bar1)
      this.chartColumn.setOption(this.option)
      window.onresize = function() {
        this.chart1.resize()
      }
      // 4.
    },
    initChart2() {
      var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
      var options = {
        grid: {
          top: '10%',
          left: '22%',
          bottom: '10%'
          // containLabel: true
        },
        // 不显示x轴的相关信息
        xAxis: {
          show: false
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            data: ['开启智慧', '消除罪孽', '解除怨结', '延延益寿', '考试顺利'],
            // 不显示y轴的线
            axisLine: {
              show: false
            },
            // 不显示刻度
            axisTick: {
              show: false
            },
            // 把刻度标签里面的文字颜色设置为白色
            axisLabel: {
              color: '#fff'
            }
          },
          {
            data: this.zhu,
            inverse: true,
            // 不显示y轴的线
            axisLine: {
              show: false
            },
            // 不显示刻度
            axisTick: {
              show: false
            },
            // 把刻度标签里面的文字颜色设置为白色
            axisLabel: {
              color: '#fff'
            }
          }
        ],
        series: [
          {
            name: '条',
            type: 'bar',
            data: [70, 80, 60, 78, 69],
            yAxisIndex: 0,
            // 修改第一组柱子的圆角
            itemStyle: {
              barBorderRadius: 20,
              // 此时的color 可以修改柱子的颜色
              color: function(params) {
                // params 传进来的是柱子对象
                // console.log(params);
                // dataIndex 是当前柱子的索引号
                return myColor[params.dataIndex]
              }
            },
            // 柱子之间的距离
            barCategoryGap: 50,
            // 柱子的宽度
            barWidth: 10,
            // 显示柱子内的文字
            label: {
              show: true,
              position: 'inside',
              // {c} 会自动的解析为 数据  data里面的数据
              formatter: '{c}%'
            }
          },
          {
            name: '框',
            type: 'bar',
            barCategoryGap: 50,
            barWidth: 15,
            yAxisIndex: 1,
            data: [100, 100, 100, 100, 100],
            itemStyle: {
              color: 'none',
              borderColor: '#00c1de',
              borderWidth: 3,
              barBorderRadius: 15
            }
          }
        ]
      }
      this.echarts2 = echarts.init(this.$refs.bar2)
      this.echarts2.setOption(options)
      window.onresize = function() {
        this.chart2.resize()
      }
    },
    initChart3() {
      var yearData = [
        {
          year: '2020', // 年份
          data: [
            // 两个数组是因为有两条线
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
          ]
        },
        {
          year: '2021', // 年份
          data: [
            // 两个数组是因为有两条线
            [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
            [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
          ]
        }
      ]
      // 2.指定配置
      var option = {
        // 通过这个color修改两条线的颜色
        color: ['#00f2f1', '#ed3f35'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // 如果series 对象有name 值，则 legend可以不用写data
          // 修改图例组件 文字颜色
          textStyle: {
            color: '#4c9bfd'
          },
          // 这个10% 必须加引号
          right: '10%'
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          show: true, // 显示边框
          borderColor: '#012f4a', // 边框颜色
          containLabel: true // 包含刻度文字在内
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          axisTick: {
            show: false // 去除刻度线
          },
          axisLabel: {
            color: '#4c9bfd' // 文本颜色
          },
          axisLine: {
            show: false // 去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false // 去除刻度线
          },
          axisLabel: {
            color: '#4c9bfd' // 文本颜色
          },
          axisLine: {
            show: false // 去除轴线
          },
          splitLine: {
            lineStyle: {
              color: '#012f4a' // 分割线颜色
            }
          }
        },
        series: [
          {
            name: '新增会员',
            type: 'line',
            // true 可以让我们的折线显示带有弧度
            smooth: true,
            data: yearData[0].data[0]
          },
          {
            name: '新增普通账号',
            type: 'line',
            smooth: true,
            data: yearData[0].data[1]
          }
        ]
      }

      this.chart3 = echarts.init(this.$refs.line1)
      this.chart3.setOption(option)
      // 4. 让图表跟随屏幕自动的去适应

      window.onresize = function() {
        this.chart3.resize()
      }
    },
    initChart4() {
      var option = {
        color: [
          '#006cff',
          '#60cda0',
          '#ed8884',
          '#ff9f7f',
          '#0096ff',
          '#9fe6b8',
          '#32c5e9',
          '#1d9dff'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: '0%',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12'
          }
        },
        series: [
          {
            name: '地区分布',
            type: 'pie',
            radius: ['10%', '70%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            // 图形的文字标签
            label: {
              fontSize: 10
            },
            // 链接图形和文字的线条
            labelLine: {
              // length 链接图形的线条
              length: 6,
              // length2 链接文字的线条
              length2: 8
            },
            data: [
              { value: 20, name: '云南' },
              { value: 26, name: '北京' },
              { value: 24, name: '山东' },
              { value: 25, name: '河北' },
              { value: 20, name: '江苏' }
            ]
          }
        ]
      }
      this.echarts3 = echarts.init(this.$refs.pie2)
      this.echarts3.setOption(option)
      window.onresize = function() {
        this.echarts3.resize()
      }
    },
    initChart5() {
      // 2.指定配置
      var option = {
        color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },

        legend: {
          bottom: '0%',
          // 修改小图标的大小
          itemWidth: 10,
          itemHeight: 10,
          // 修改图例组件的文字为 12px
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12'
          }
        },
        series: [
          {
            name: '年龄分布',
            type: 'pie',
            // 这个radius可以修改饼形图的大小
            // radius 第一个值是内圆的半径 第二个值是外圆的半径
            radius: ['40%', '60%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            // 图形上的文字
            label: {
              show: false,
              position: 'center'
            },
            // 链接文字和图形的线是否显示
            labelLine: {
              show: false
            },
            data: [
              { value: 1, name: '0岁以下' },
              { value: 4, name: '20-29岁' },
              { value: 2, name: '30-39岁' },
              { value: 2, name: '40-49岁' },
              { value: 1, name: '50岁以上' }
            ]
          }
        ]
      }
      this.echarts5 = echarts.init(this.$refs.pie1)
      this.echarts5.setOption(option)
      window.onresize = function() {
        this.echarts5.resize()
      }
      // 3. 把配置给实例对象
      // 4. 让图表跟随屏幕自动的去适应
    },
    initChart6() {
      // 2.指定配置
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '0%',
          data: ['平板', '手写本'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12'
          }
        },

        grid: {
          left: '10',
          top: '30',
          right: '10',
          bottom: '10',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            // x轴更换数据
            data: [
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26',
              '26',
              '28',
              '29',
              '30'
            ],
            // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: 12
              }
            },
            // x轴线的颜色为   rgba(255,255,255,.2)
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.2)'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            },
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: 12
              }
            },
            // 修改分割线的颜色
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            }
          }
        ],
        series: [
          {
            name: '平板',
            type: 'line',
            smooth: true,
            // 单独修改当前线条的样式
            lineStyle: {
              color: '#0184d5',
              width: '2'
            },
            // 填充颜色设置
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(1, 132, 213, 0.4)' // 渐变色的起始颜色
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(1, 132, 213, 0.1)' // 渐变线的结束颜色
                  }
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)'
            },
            // 设置拐点
            symbol: 'circle',
            // 拐点大小
            symbolSize: 8,
            // 开始不显示拐点， 鼠标经过显示
            showSymbol: false,
            // 设置拐点颜色以及边框
            itemStyle: {
              color: '#0184d5',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            },
            data: [
              30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40,
              30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40
            ]
          },
          {
            name: '手写本',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                color: '#00d887',
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0, 216, 135, 0.4)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0, 216, 135, 0.1)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            // 设置拐点 小圆点
            symbol: 'circle',
            // 拐点大小
            symbolSize: 5,
            // 设置拐点颜色以及边框
            itemStyle: {
              color: '#00d887',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            },
            // 开始不显示拐点， 鼠标经过显示
            showSymbol: false,
            data: [
              130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40,
              130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20
            ]
          }
        ]
      }
      this.echarts6 = echarts.init(this.$refs.line2)
      this.echarts6.setOption(option)
      // 3. 把配置给实例对象
      // 4. 让图表跟随屏幕自动的去适应
      window.onresize = function() {
        this.echarts6.resize()
      }
    }
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
}
@font-face {
  font-family: electronicFont;
  src: url("~@/icons/font/DS-DIGIT.TTF");
}
#building {
  background: url("~@/icons/svg/bg.jpg") no-repeat top center;
}

header {
  position: relative;
  height: 1.25rem;
  background: url("~@/icons/svg/head_bg.png") no-repeat;
  background-size: 100% 100%;
}
header h1 {
  font-size: 2.475rem;
  color: #fff;
  text-align: center;
  line-height: 3rem;
}
header .showTime {
  position: absolute;
  right: 0.375rem;
  top: 0;
  line-height: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.25rem;
}
.mainbox {
  display: flex;
  min-width: 1024px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0.125rem 0.125rem 0;
}
.mainbox .column {
  flex: 3;
}
.mainbox .column:nth-child(2) {
  flex: 5;
  margin: 0 0.125rem 0.1875rem;
  overflow: hidden;
}
.mainbox .panel {
  position: relative;
  height: 11rem;
  padding: 0 0.1875rem 0.5rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
  margin-bottom: 0.1875rem;
  background: url("~@/icons/svg/line\(1\).png") rgba(255, 255, 255, 0.03);
}
.mainbox .panel::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel .panel-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.mainbox .panel .panel-footer::before {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel h2 {
  height: 0.6rem;
  color: #fff;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.25rem;
  font-weight: 400;
}
.mainbox .panel h2 a {
  color: #fff;
  text-decoration: none;
  margin: 0 0.125rem;
}
.mainbox .panel .chart {
  height: 10rem;
}
.no {
  background: rgba(101, 132, 226, 0.1);
  padding: 0.1875rem;
}
.no .no-hd {
  position: relative;
  border: 1px solid rgba(25, 186, 139, 0.17);
}
.no .no-hd::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 30px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.no .no-hd::after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: "";
  width: 30px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
}
.no .no-hd ul {
  display: flex;
}
/* 数字样式 */
.no .no-hd ul li {
  position: relative;
  flex: 1;
  line-height: 4rem;
  font-size: 3rem;
  color: #ffeb7b;
  text-align: center;
  font-family: "electronicFont";
}
.no .no-hd ul li::after {
  content: "";
  position: absolute;
  top: 25%;
  right: 0;
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
}
.no .no-bd ul {
  display: flex;
}
.no .no-bd ul li {
  flex: 1;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 2rem;
  height: 3.5rem;
  line-height: 3.5rem;
  padding-top: 0.125rem;
}
.map {
  height: 10.125rem;
}
.map .map1 {
  width: 20rem;
  height: 20rem;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("~@/icons/svg/map.png");
  background-size: 100% 100%;
  opacity: 0.3;
}
.map .map2 {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  height: 20rem;
  background: url("~@/icons/svg/lbx.png");
  animation: rotate1 15s linear infinite;
  opacity: 0.6;
  background-size: 100% 100%;
}
.map .map3 {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 21rem;
  height: 21rem;
  background: url("~@/icons/svg/jt.png");
  animation: rotate2 10s linear infinite;
  opacity: 0.6;
  background-size: 100% 100%;
}
.map .chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10.125rem;
}
@keyframes rotate1 {
  form {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes rotate2 {
  form {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
/* 约束屏幕尺寸 */
@media screen and (max-width: 1024px) {
  html {
    font-size: 20px !important;
  }
}
@media screen and (min-width: 1920px) {
  html {
    font-size: 20px !important;
  }
}
</style>
