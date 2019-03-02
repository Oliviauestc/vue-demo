<template>
  <div id="content">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
  import logo from '../../images/logo.png'
  export default {
    data () {
      return {
        logo,
        nodeList: [{
          name: 'site1',
          x: 0,
          y: 0
        }, {
          name: 'site2',
          x: 50,
          y: 0
        }, {
          name: 'site3',
          x: 100,
          y: 0
        }],
        scene: {}
      }
    },
    mounted () {
      var canvas = document.getElementById('canvas')
      var stage = new JTopo.Stage(canvas)
      showJTopoToobar(stage)
      this.scene = new JTopo.Scene(stage)
      for (var i = 0; i < this.nodeList.length; i++) {
        this.addNode(this.nodeList[i])
      }
      var beginNode = null
      var tempNodeA = new JTopo.Node('tempA')
      tempNodeA.setSize(1, 1)
      var tempNodeZ = new JTopo.Node('tempZ')
      tempNodeZ.setSize(1, 1)
      var link = new JTopo.Link(tempNodeA, tempNodeZ)
      this.scene.mouseup(e => {
        if (e.button === 2) {
          this.scene.remove(link)
          return
        }
        if (e.target !== null && e.target instanceof JTopo.Node) {
          if (beginNode === null) {
            beginNode = e.target
            this.scene.add(link)
            tempNodeA.setLocation(e.x, e.y)
            tempNodeZ.setLocation(e.x, e.y)
          } else if (beginNode !== e.target) {
            var endNode = e.target
            var l = new JTopo.Link(beginNode, endNode)
            l.arrowsRadius = 10
            this.scene.add(l)
            console.log('link%%%%', l.nodeA.text, l.nodeZ.text)
            beginNode = null
            this.scene.remove(link)
          } else {
            beginNode = null
          }
        } else {
          this.scene.remove(link)
        }
      })
      this.scene.mousedown(e => {
        if (e.target === null || e.target === beginNode || e.target === link) {
          this.scene.remove(link)
        }
      })
      this.scene.mousemove(e => {
        tempNodeZ.setLocation(e.x, e.y)
      })
    },
    methods: {
      addNode (node) {
        var n = new JTopo.Node()
        n.text = node.name // 文字
        n.textPosition = 'Middle_Center' // 文字居中
        n.textOffsetY = 25 // 文字向下偏移8个像素
        n.font = '10px 微软雅黑' // 字体
        n.fontColor = '0,0,0' // 字体
        n.setLocation(node.x, node.y) // 位置
        n.setSize(25, 25)  // 尺寸
        n.borderRadius = 2 // 圆角
        n.borderWidth = 2 // 边框的宽度
        n.borderColor = '255,255,255' // 边框颜色
        this.scene.add(n)
      }
    }
  }
</script>
<style>
#centent {
  border:1px solid red;
  width: 75%;
}
#canvas {
  border:1px solid red;
}
</style>
