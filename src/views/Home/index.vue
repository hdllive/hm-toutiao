<template>
  <div>
    <van-nav-bar title="标题">
      <template #title>
        <van-button type="info" round icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in mychannels" :key="item.id"
        >内容{{ item.id }}</van-tab
      >

      <template #nav-right>
        <div class="menu">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getMyChannels } from '@/api/home'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      mychannels: {}
    }
  },
  methods: {
    async getMyChannels () {
      try {
        const res = await getMyChannels()
        console.log(res)
        this.mychannels = res.data.data.channels
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  //去掉原有的样式
  max-width: unset;
}

/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}

/deep/ .van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}

.menu {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
