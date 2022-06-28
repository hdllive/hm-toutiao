<template>
  <div>
    <!-- 登录后 -->
    <!-- 判断是否有token值显示 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <div>
        <ul class="list">
          <li>
            <p>{{ userInfo.art_count }}</p>
            <p>头条</p>
          </li>
          <li>
            <p>{{ userInfo.follow_count }}</p>
            <p>关注</p>
          </li>
          <li>
            <p>{{ userInfo.fans_count }}</p>
            <p>粉丝</p>
          </li>
          <li>
            <p>{{ userInfo.like_count }}</p>
            <p>获赞</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 登录前 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item icon="star-o" text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="clock-o" text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>

    <van-button
      class="logout"
      type="default"
      block
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '你确定要退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background: rgb(51, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 50px;
    padding-left: 33px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      color: #666666;
      line-height: 33px;
      text-align: center;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        height: 29px;
        font-size: 30px;
        font-weight: 400;
        color: #ffffff;
        margin-left: 22px;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #fff;
        font-weight: 400;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    font-weight: 400;
    color: #ffffff;
    padding: 0;
    margin: 0;
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/ .van-grid-item__text {
  font-size: 28px;
}

.van-cell-group {
  margin: 9px 0;
}

.logout {
  color: #d86262;
}
</style>
