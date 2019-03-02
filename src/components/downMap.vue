<template>
  <div class="hello">
    <div id="map-chart" style="width:100%; height: 800px;" ref="mapChart"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import echarts from 'echarts'
import provinceMap from '@/js/provincemap.json'
import cityMap from '@/js/citymap.json'
export default {
  name: 'index',
  data () {
    return {
      /* startTime：开始时间，
         endTime结束时间，
         month选择的月份，
         provinceCode: 省码，
         provinceName: 省名，
         cityCode: 市码
      */
      mapchart: '',
      option: {},
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      provinceMap,
      cityMap
    }
  },
  mounted () {
    this.initCanvas()
    this.updateMap()
  },
  methods: {
    updateMap () {
      if (this.provinceName) {
        this.drawMap(this.provinceName)
      } else {
        this.drawMap('china')
      }
    },
    // 初始化画布
    initCanvas () {
      var _self = this
      this.mapchart = echarts.init(document.getElementById('map-chart'))
      this.option = {
        backgroundColor: '#03020F',
        series: [
          {
            type: 'map',
            zoom: 1,
            // roam: true,
            roam: 'scale',
            // top: '85px',
            nameMap: {
              china: '中国'
            },
            // layoutCenter: ['30%', '30%'],
            // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
            // layoutSize: 100,
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 13
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#538AFF',
                borderColor: 'dodgerblue'
              },
              emphasis: {
                areaColor: '#909399'
              }
            }
          }
        ],
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000
      }
      // 地图点击事件
      this.mapchart.on('click', function (params) {
        if (params.name in _self.provinceMap) {
          // 如果点击的是34个省、市、自治区，绘制选中地区的二级地图
          _self.provinceCode = _self.provinceMap[params.name]
          _self.provinceName = params.name
          _self.updateMap()
        } else {
          // 如果点击的是34个省、市、自治区，绘制选中地区的二级地图
          _self.provinceCode = ''
          _self.provinceName = ''
          _self.updateMap()
        }
      })
    },
    // 画地图
    drawMap (name) {
      var _self = this
      // 绘制全国地图
      var url = ''
      if (name === 'china') {
        url = 'static/map/china.json'
      } else {
        url = 'static/map/province/' + this.provinceMap[name] + '.json'
      }
      $.getJSON(url, function (data) {
        var d = []
        for (var i = 0; i < data.features.length; i++) {
          d.push({
            name: data.features[i].properties.name
          })
        }
        echarts.registerMap(name, data)
        _self.renderMap(name, d)
      })
    },
    // 渲染着色
    renderMap (map, data) {
      this.option.series[0].data = data
      this.option.series[0].name = map
      this.option.series[0].mapType = map
      // 渲染地图
      this.mapchart.setOption(this.option)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
