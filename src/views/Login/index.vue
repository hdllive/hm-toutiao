<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '不符合手机号规范',
          },
        ]"
      >
        <template #left-icon>
          <!-- <i class="toutiao toutiao-shouji"></i> -->
          <MyIcon name="shouji"></MyIcon> </template
      ></van-field>

      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度须为六位' },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            @finish="isCountDownShow = false"
            v-if="isCountDownShow"
            :time="time"
            format=" ss s"
          />
          <van-button
            v-else
            @click="onSendSms"
            size="small"
            class="yzm"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="login-btn"
          ><span>登录</span></van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
import MyIcon from '@/components/MyIcon.vue'
export default {
  created () { },
  data () {
    return {
      mobile: '13811111111', // 手机号
      code: '246810', // 验证码
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败，请重试')
        }
      } catch (err) {
        console.log(err)
        // 请提示
        this.$toast.fail('手机号提示不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { MyIcon }
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 60px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  position: fixed;
  right: 10px;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  span {
    width: 62px;
    height: 29px;
    font-size: 30px;
    line-height: 36px;
    color: #ffffff;
  }
}
.van-count-down {
  position: fixed;
  right: 18px;
}
</style>
