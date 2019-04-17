<template>
  <div class="douban-header">
    <div class="douban-bar">
      <ul>
        <li v-for="bar in barList" @click="choiceUrl(bar.title)" :key="bar.title">
          <router-link :to="bar.url" :class="title===bar.title? 'active':''">{{bar.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        content: '',
        title: '折线图',
        barList: [{
          title: '折线图',
          url: '/'
        }, {
          title: '环形图',
          url: '/circle'
        }, {
          title: '拖拽拓扑',
          url: '/bars'
        }, {
          title: '地图拓扑',
          url: '/commonMap'
        }, {
          title: '下钻地图',
          url: '/downMap'
        }, {
          title: '上传下载',
          url: '/download'
        }, {
          title: 'test',
          url: '/test'
        }]
      }
    },
    created () {
      const found = this.barList.find(element => {
        return element.url === window.location.pathname
      })
      this.title = found.title
    },
    methods: {
      choiceUrl (title) {
        this.title = title
      },
      searchMovie () {
        this.$store.commit('SEARCH_TEXT', {searchText: this.content})
        this.$store.dispatch('getSearchList')
        this.$store.commit('SEARCH_LOADING', {loading: true})
        this.$router.push({path: '/search', query: {searchText: this.content}})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../style/color";
  .douban-header{
    background: @mainColor;
    width: 100%;
    height: 50px;
    .douban-bar{
      width: 950px;
      margin: 0 auto;
      height: 20px;
      ul{
        li{
          list-style: none;
          float: left;
          line-height: 20px;
          cursor: pointer;
          a{
            display: inline-block;
            padding: 8px;
            font-size: 12px;
            color: #aaa;
            text-decoration: none;
          }
          a.active{
            color: @doubanColor;
          }
        }
      }
    }
    .douban-header-container{
      width: 100%;
      margin: 0 auto;
      border-bottom: 1px solid @line;
      .douban-search{
        width: 950px;
        margin: 0 auto;
        height: 75px;
        .title{
          color: @doubanColor;
          font-size: 30px;
          font-weight: bold;
          line-height: 75px;
        }
        .search-container{
          display: inline-block;
          line-height: 75px;
          vertical-align: top;
          width: 500px;
          margin-left: 50px;
          input{
            height: 34px;
          }
        }
        .douban-title-img{
          width: 175px;
          height: 90px;
          float: right;
          margin-top: 10px;
        }
      }
    }
  }
</style>
