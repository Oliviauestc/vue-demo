<template>
  <div class="echarts">
    <div :style="{height:'800px',width:'100%'}" ref="myEchart"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import '../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
  export default {
    name: 'echarts',
    data () {
      return {
        networks: [],
        sdata: [{
          'name': '站点1',
          'value': 100,
          'userNumber': 200
        }, {
          'name': '站点2',
          'value': 200,
          'userNumber': 300
        }, {
          'name': '站点3',
          'value': 300,
          'userNumber': 243
        }, {
          'name': '站点4',
          'value': 400,
          'userNumber': 320
        }, {
          'name': '站点5',
          'value': 500,
          'userNumber': 32
        }],
        lineData: {
          'network2': [
            [{name: '站点3'}, {name: '站点4'}],
            [{name: '站点4'}, {name: '站点2'}],
            [{name: '站点2'}, {name: '站点3'}]
          ],
          'network4': [
            [{name: '站点1'}, {name: '站点2'}],
            [{name: '站点1'}, {name: '站点4'}],
            [{name: '站点1'}, {name: '站点5'}]
          ]
        },
        geoCoordMap: {
          '站点3': [114.07, 22.62],
          '站点2': [121.48, 31.22],
          '站点5': [104.06, 30.67],
          '站点4': [114.31, 30.52],
          '站点1': [116.46, 39.92]
        }
      }
    },
    mounted () {
      this.chinaConfigure()
    },
    beforeDestroy () {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      convertData (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = this.geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
              userNumber: data[i].userNumber
            })
          }
        }
        return res
      },
      convertLineData (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i]
          var fromCoord = this.geoCoordMap[dataItem[0].name]
          var toCoord = this.geoCoordMap[dataItem[1].name]
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord]
            })
          }
        }
        return res
      },
      convertSeries () {
        var series = []
        var color = ['#a6c84c', '#ffa022', '#46bee9']
        var i = 0
        for (let item in this.lineData) {
          this.networks.push(item)
          series.push({
            name: item,
            type: 'lines',
            zlevel: 1,
            symbol: ['arrow', 'arrow'],
            // effect: {
            //   show: true,
            //   period: 6,
            //   trailLength: 0.7,
            //   color: '#fff',
            //   symbolSize: 3
            // },
            lineStyle: {
              normal: {
                color: color[i % (color.length)],
                width: 2,
                curveness: 0
              }
            },
            data: this.convertLineData(this.lineData[item])
          })
          i++
        }
        series.push({
          type: 'effectScatter', // 类型为（带有动画作用的）散点
          coordinateSystem: 'geo', // 散点绘于地理坐标系上
          label: {
            normal: {
              show: true,
              color: '#ffffff',
              position: 'right',
              formatter: '{b}'
            }
          },
          legendHoverLink: true,
          data: this.convertData(this.sdata),
          itemStyle: { // series样式
            normal: {
              color: '#3D7878'
            }
          },
          symbol: 'circle', // 标记的图形
          symbolSize: function (val) { // 根据数值大小控制标记的大小
            return val[2] / 10
          }
        })
        return series
      },
      chinaConfigure () {
        let myChart = echarts.init(this.$refs.myEchart) // 这里是为了获得容器所在位置
        window.onresize = myChart.resize
        myChart.setOption({ // 进行相关配置
          backgroundColor: '#404a59',
          // 提示框组件
          tooltip: {
            trigger: 'item',
            enterable: true,
            formatter: function (params) {
              return `<div class="toop-line"><a>终端用户数：${params.data.userNumber}</a></div>`
            }
          },
          legend: {
            orient: 'vertical',
            top: 'bottom',
            left: 'right',
            data: this.networks,
            textStyle: {
              color: '#fff'
            },
            selectedMode: 'multiple'
          },
          // 地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集
          geo: {
            map: 'china', // 表示中国地图
            roam: true, // 是否开启鼠标缩放和平移漫游
            label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称
              normal: {
                show: false // 是否显示对应地名
              },
              emphasis: { // 高亮状态的样式
                show: false, // 是否显示对应地名
                fontSize: 14,
                color: '#ffffff'
              }
            },
            itemStyle: { // 地图区域的多边形图形样式
              normal: { // 普通状态的样式
                areaColor: '#404a59', // 地图区域的颜色
                borderColor: '#ffffff' // 图形的描边颜色
              },
              emphasis: { // 高亮状态的样式
                areaColor: '#404a59',
                shadowBlur: 20, // 图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          // 系列列表,每个系列通过type决定自己的图表类型
          series: this.convertSeries()
          // series: [
          //   {
          //     type: 'effectScatter', // 类型为（带有动画作用的）散点
          //     coordinateSystem: 'geo', // 散点绘于地理坐标系上
          //     label: {
          //       normal: {
          //         show: true,
          //         color: '#ffffff',
          //         position: 'right',
          //         formatter: '{b}'
          //       }
          //     },
          //     legendHoverLink: true,
          //     data: this.convertData(this.sdata),
          //     itemStyle: { // series样式
          //       normal: {
          //         color: '#3D7878'
          //       }
          //     },
          //     symbol: 'circle', // 标记的图形
          //     symbolSize: function (val) { // 根据数值大小控制标记的大小
          //       return val[2] / 10
          //     }
          //   },
          //   {
          //     type: 'lines',
          //     zlevel: 1,
          //     symbol: ['arrow', 'arrow'],
          //     silent: true, // 不响应不触发鼠标事件
          //     // effect: { // 线特效的配置
          //     //   show: true,
          //     //   period: 6,
          //     //   trailLength: 0.7,
          //     //   color: '#fff',
          //     //   symbolSize: 3
          //     // },
          //     lineStyle: {
          //       normal: {
          //         color: '#BBFFBB',
          //         width: 2,
          //         curveness: 0
          //       }
          //     },
          //     data: this.convertLineData(this.lineData)
          //   }
          // ]
        })
      }
    }
  }
</script>
