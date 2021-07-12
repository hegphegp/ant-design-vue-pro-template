<template>
  <div class="main">
    <a-form layout="inline" class="user-layout-login" :form="form">
      <h1 style="text-align: center">后台管理系统登录页面后台管理系统登录</h1>
      <a-form-item>
        <a-input type="text" placeholder="请输入账户名或邮箱地址" v-decorator="['loginAccount', ValidateRules.username]" />
      </a-form-item>
      <a-form-item>
        <a-input type="password" placeholder="请输入密码" v-decorator="['loginPassword', ValidateRules.password]" />
      </a-form-item>
      <a-form-item>
        <a-col :span="16">
          <a-input type="text" placeholder="请输入验证码" v-decorator="['verifyCode', ValidateRules.verifyCode]" />
        </a-col>
        <a-col :span="7" style="float: right">
          <img :src="verifyCodeUrl" @click="changeVerifyCodeFun" style="cursor:pointer;" class="getCaptcha"/>
        </a-col>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit" class="login-button" :disabled="loginBtnDisable" >登陆</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import cryptoUtil from '../../utils/cryptoUtils'
import constant from '../../config/constant'

export default {
  components: {},
  data () {
    return {
      form: this.$form.createForm(this),
      loginBtnDisable: false,
      verifyCodeUrl: process.env.VUE_APP_API_BASE_URL + '/oauth/verifyCode?t=' + new Date().getTime(),
      ValidateRules: {
        username: {
          rules: [
            { required: true, message: '账户名称不能为空！' },
            { max: 20, message: '账号长度不能超过20个字符！' }
          ],
          validateTrigger: 'blur'
        },
        password: {
          rules: [
            { required: true, message: '密码不能为空！' },
            { max: 20, message: '密码长度不能超过20个字符！' }
          ],
          validateTrigger: 'blur'
        },
        verifyCode: {
          rules: [{ required: true, message: '验证码不能为空！' }],
          validateTrigger: 'blur'
        }
      }
    }
  },
  mounted () {
    // 设置字段默认值
    this.form.setFieldsValue({
      verifyCode: '1234'
    })
  },
  methods: {
    changeVerifyCodeFun () {
      this.verifyCodeUrl = process.env.VUE_APP_API_BASE_URL + '/oauth/verifyCode?t=' + new Date().getTime()
    },
    handleSubmit (e) {
      this.loginBtnDisable = true
      e.preventDefault()
      const requiredFields = ['loginAccount', 'loginPassword', 'verifyCode']
      // 这个校验字段框架的约束，要提交的字段必须定义在 requiredFields ，即使这些字段允许为空
      this.form.validateFields(requiredFields, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { }
          loginParams.username = cryptoUtil.encryptAESCBC(values.loginAccount, constant.AESKey, constant.AESIv)
          loginParams.password = cryptoUtil.encryptAESCBC(values.loginPassword, constant.AESKey, constant.AESIv)
          loginParams.code = values.verifyCode
          this.$store
            .dispatch('Login', loginParams)
            .then((res) => this.loginSuccess(res))
            .catch((err) => this.requestFailed(err))
            .finally(() => {
              console.log('执行finally')
              this.loginBtnDisable = false
            })
        } else {
          this.loginBtnDisable = false
        }
      })
    },
    loginSuccess (res) {
      console.log('执行loginSuccess')
      this.$store.dispatch('GetInfo')
      this.$router.push({ path: '/' })

      /**
      const redirect = this.$route.query.redirect
      if (redirect != null && redirect !== undefined && redirect !== '') {
        this.$router.push({ path: redirect })
      } else {
        this.$router.push({ path: '/' })
      }
       */
      /**
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `欢迎回来`,
          duration: 2
        })
      }, 1000)
      */
    },
    requestFailed (err) {
      this.verifyCodeUrl = process.env.VUE_APP_API_BASE_URL + '/oauth/verifyCode?t=' + new Date().getTime()
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 2
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;

  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 108px;
      height: 30px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
}
</style>
