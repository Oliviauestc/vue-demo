<template>
  <div class="container">
    <div class="canvas-demo">
      <canvas ref="zigLine" width="800" height="600"></canvas>   
    </div>
    <div class="canvas-demo">
      <canvas ref="bar" width="800" height="600"></canvas>  
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        xdata: ['10-30', '11-2', '11-4', '11-6', '11-8', '11-10', '11-12', '11-14', '11-16', '11-18', '11-20', '11-22', '11-24'],
        ydata: [110, 145, 60, 130, 50, 20, 80, 100, 70, 150, 130, 50, 20],
        colors: ['#FF4500', '#CD853F', '#FFDAB9', '#8B4513', '#90EE90', '#20B2AA', '#808000', '#BDB76B', '#F5F5DC', '#FFFAFA', '#FA8072', '#DDA0DD', '#0088A8'],
        x: 50,
        y: 550,
        h: 500
      }
    },
    mounted () {
      this.displayZigLine()
      this.displayBars()
    },
    methods: {
      displayZigLine () {
        this.drawCoord(this.x, this.y, this.h, 'zigLine') // 画坐标轴
        this.drawLine() // 画折线
        this.drawMark() // 画点
        this.drawYlable(this.x, this.y, this.h, 'zigLine', 200, 5) // 画纵坐标的比例和横线
        this.drawXlable(this.x, this.y, this.h, 'zigLine')
      },
      displayBars () {
        this.drawCoord(this.x, this.y, this.h, 'bar') // 画坐标轴
        this.drawBars()
        this.drawYlable(this.x, this.y, this.h, 'bar', 200, 5) // 画纵坐标的比例和横线
        this.drawXlable(this.x, this.y, this.h, 'bar')
      },
      drawCoord (x, y, h, ref) { // 画坐标轴,x,y原点坐标,h坐标长度
        var c = this.$refs[ref]
        var ctx = c.getContext('2d')
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.strokeStyle = '#CCCCCC'
        ctx.moveTo(x, y)
        ctx.lineTo(x, y - h)
        ctx.stroke()  // 进行绘制
        ctx.moveTo(x, y)
        ctx.lineTo(x + h, y)
        ctx.stroke()  // 进行绘制
      },
      drawLine () { // 画折线
        var x = 50
        var y = 550  // x,y原点坐标
        var h = 500  // 坐标长度
        var yTotal = 200 // 纵轴实际大小
        var c = this.$refs.zigLine
        var ctx = c.getContext('2d')
        var xInc = h / (this.xdata.length - 1)
        ctx.lineWidth = 3
        ctx.strokeStyle = '#ffffff'
        var currentX = x
        for (var i = 0; i < this.xdata.length - 1; i++) {
          var currentY = y - this.ydata[i] * h / yTotal
          var nextY = y - this.ydata[i + 1] * h / yTotal
          ctx.beginPath()
          ctx.moveTo(currentX, currentY)
          ctx.lineTo(currentX + xInc, nextY)
          ctx.stroke()  // 进行绘制
          currentX = currentX + xInc
        }
      },
      drawMark () { // 画折线上各个点
        var x = 50
        var y = 550  // x,y原点坐标
        var h = 500  // 坐标长度
        var yTotal = 200 // 纵轴实际大小
        var c = this.$refs.zigLine
        var ctx = c.getContext('2d')
        var xInc = h / (this.xdata.length - 1)
        ctx.fillStyle = '#ffffff'
        ctx.font = '16px SimHei'
        var currentX = x
        for (var i = 0; i < this.xdata.length; i++) {
          var currentY = y - this.ydata[i] * h / yTotal
          ctx.beginPath()
          ctx.lineWidth = 4
          ctx.strokeStyle = '#ffffff'
          ctx.arc(currentX, currentY, 2, 0, 2 * Math.PI)
          ctx.stroke()  // 进行绘制
          currentX = currentX + xInc
        }
      },
      drawXlable (x, y, h, ref) {
        var c = this.$refs[ref]
        var xInc = h / (this.xdata.length - 1)
        var ctx = c.getContext('2d')
        ctx.fillStyle = '#CCCCCC'
        ctx.font = '16px SimHei'
        ctx.translate(x, y)
        for (var i = 0; i < this.xdata.length; i++) {
          ctx.rotate(-50 * Math.PI / 180)
          ctx.fillText(this.xdata[i], -50, 10)
          ctx.rotate(50 * Math.PI / 180)
          ctx.translate(xInc, 0)
        }
      },
      drawYlable (x, y, h, ref, yTotal, divideNum) { // 画纵坐标
        var c = this.$refs[ref]
        var ctx = c.getContext('2d')
        ctx.fillStyle = '#CCCCCC'
        ctx.font = '16px SimHei'
        ctx.lineWidth = 1
        ctx.strokeStyle = '#cccccc'
        for (var i = 1; i <= divideNum; i++) {
          ctx.fillText(yTotal / divideNum * i, x - 30, y - h / divideNum * i + 10)
          ctx.beginPath()
          ctx.moveTo(x, y - h / divideNum * i)
          ctx.lineTo(x + h, y - h / divideNum * i)
          ctx.stroke()  // 进行绘制
        }
      },
      drawBars () { // 画柱形
        var x = 50
        var y = 550  // x,y原点坐标
        var h = 500  // 坐标长度
        var c = this.$refs.bar
        var xInc = h / (this.xdata.length - 1)
        var ctx = c.getContext('2d')
        ctx.lineWidth = xInc / 2
        ctx.font = '16px SimHei'
        for (var i = 0; i < this.xdata.length; i++) {
          ctx.strokeStyle = this.colors[i]
          ctx.beginPath()
          ctx.moveTo(x + i * xInc + xInc / 4, y)
          ctx.lineTo(x + i * xInc + xInc / 4, y - h / 200 * this.ydata[i])
          ctx.stroke()
          ctx.fillStyle = this.colors[i]
          ctx.fillText(this.ydata[i], x + i * xInc, y - h / 200 * this.ydata[i] - 20)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/css">
.container {
  background-color: #404a59; 
  min-height: 800px;
}
.canvas-demo {
  display: inline-block;
}
</style>
