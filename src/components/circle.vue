<template>
  <div class="container">
    <div class="canvas-demo">
      <canvas ref="multiCircle" width="350" height="400"></canvas>   
    </div>
    <div class="canvas-demo">
      <canvas ref="circle" width="300" height="400"></canvas>
    </div>
    <div class="canvas-demo">
      <canvas ref="circle2" width="500" height="400"></canvas>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        total: 100,
        current: 69,
        items: [450, 550, 500, 600],
        totalNumber: 800
      }
    },
    mounted () {
      this.drawMuitiCircle()
      this.drawCircle()
      this.drawCircle2()
    },
    methods: {
      drawCircle () {
        var x = 150
        var y = 200
        var r = 50
        var c = this.$refs.circle
        var ctx = c.getContext('2d')
        ctx.lineWidth = 10
        ctx.strokeStyle = '#7FFFD4'
        var eAngle = this.current / this.total * 2 * Math.PI
        ctx.beginPath()
        ctx.arc(x, y, r, 0, eAngle)
        ctx.stroke()
        ctx.fillStyle = '#ffffff'
        ctx.font = '20px Times New Roman'
        var text = ((1 - this.current / this.total) * 100).toFixed(1)
        ctx.fillText(text + '%', x - 20, y)
        ctx.font = '10px SimHei'
        ctx.fillText('节约电量', x - 20, y + 20)
        this.drawFillCircle(x, y, r, eAngle, 'circle')
      },
      drawMuitiCircle () {
        var x = 120
        var y = 200
        var r = 30
        var xh = 50
        var yh = 150
        var colors = ['#FF4500', '#CD853F', '#FFDAB9', '#8B4513']
        var text = ['开启', '关闭', '故障', '失联']
        var c = this.$refs.multiCircle
        var ctx = c.getContext('2d')
        for (var i = 0; i < this.items.length; i++) {
          r = r + 15
          yh = yh - 30
          ctx.lineWidth = 10
          ctx.strokeStyle = colors[i]
          var eAngle = this.items[i] / this.totalNumber * 2 * Math.PI
          ctx.beginPath()
          ctx.arc(x, y, r, 0, eAngle)
          ctx.stroke()
          this.drawFillCircle(x, y, r, eAngle, 'multiCircle')
          ctx.lineWidth = 2
          ctx.strokeStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(x + r, y + 5, 1, 0, 2 * Math.PI)
          ctx.stroke()
          ctx.beginPath()
          ctx.lineWidth = 1
          ctx.strokeStyle = 'white'
          ctx.moveTo(x + r, y + 5)
          ctx.lineTo(x + r + xh, y - yh)
          ctx.stroke()  // 进行绘制
          ctx.moveTo(x + r + xh, y - yh)
          ctx.lineTo(x + r + xh + 100, y - yh)
          ctx.stroke()
          ctx.fillStyle = '#ffffff'
          ctx.font = '10px SimHei'
          ctx.fillText(text[i], x + r + xh + 40, y - yh)
          ctx.fillStyle = colors[i]
          ctx.font = '15px SimHei'
          ctx.fillText(this.items[i], x + r + xh + 65, y - yh)
        }
      },
      drawFillCircle (x, y, r, bAngle, ref) {
        var c = this.$refs[ref]
        var ctx = c.getContext('2d')
        ctx.lineWidth = 7
        ctx.strokeStyle = '#708090'
        ctx.beginPath()
        ctx.arc(x, y, r, bAngle, 2 * Math.PI)
        ctx.stroke()
      },
      drawCircle2 () {
        var x = 150
        var y = 200
        var r = 40
        var colors = ['#FF4500', '#CD853F', '#FFDAB9', '#8B4513']
        var c = this.$refs.circle2
        var ctx = c.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.font = '16px SimHei'
        var bAngle = 0
        var eAngle = 2 * Math.PI
        var sum = 0
        this.items.forEach(v => {
          sum += v
        })
        for (var i = 0; i < this.items.length; i++) {
          ctx.lineWidth = 80
          ctx.strokeStyle = colors[i]
          eAngle = eAngle + this.items[i] / sum * 2 * Math.PI
          ctx.beginPath()
          ctx.arc(x, y, r, bAngle, eAngle)
          ctx.stroke()
          bAngle = eAngle
        }
        this.drawMarks()
      },
      drawMarks () {
        var x = 280
        var y = 160
        var r = 4
        var colors = ['#FF4500', '#CD853F', '#FFDAB9', '#8B4513']
        var texts = ['开启', '关闭', '故障', '失联']
        var c = this.$refs.circle2
        var ctx = c.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.font = '16px SimHei'
        ctx.lineWidth = 8
        for (var i = 0; i < this.items.length; i++) {
          ctx.strokeStyle = colors[i]
          ctx.beginPath()
          ctx.arc(x, y, r, 0, 2 * Math.PI)
          ctx.stroke()
          var text = texts[i]
          ctx.fillText(text, x + 20, y + 5)
          ctx.fillText(this.items[i], x + 20 + 50, y + 5)
          y += 30
        }
      }
    },
    computed: {
    },
    components: {
    }
  }
</script>

<style rel="stylesheet/css">
.container {
  background-color: #778899; 
  min-height: 800px;
}
.canvas-demo {
  display: inline-block;
}
</style>
