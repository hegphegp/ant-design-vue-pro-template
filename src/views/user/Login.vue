<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
      <h1 style="text-align: center;">后台管理系统登录页面后台管理系统登录</h1>
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入账户名或邮箱地址"
          v-decorator="['loginAccount', ValidateRules.username ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          type="password"
          placeholder="请输入密码"
          v-decorator="[ 'loginPassword', ValidateRules.password ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-col :span="16">
          <a-input
            size="large"
            type="text"
            placeholder="请输入验证码"
            v-decorator="[ 'verifyCode', ValidateRules.verifyCode ]"
          >
          </a-input>
        </a-col>
        <a-col :span="7" style="float:right">
          <img src="http://layuimini.99php.cn/iframe/v2/images/captcha.jpg"/>
        </a-col>
      </a-form-item>
      <a-form-item style="margin-top: 24px;">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :disabled="loginBtnDisable">登陆</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  components: { },
  data () {
    return {
      form: this.$form.createForm(this),
      loginBtnDisable: false,
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
          rules: [
            { required: true, message: '验证码不能为空！' }
          ],
          validateTrigger: 'blur'
        }
      }
    }
  },
  mounted () { // 设置字段默认值
    this.form.setFieldsValue({
      verifyCode: '设置默认值'
    })
  },
  methods: {
    handleSubmit (e) {
      this.loginBtnDisable = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          // loginParams.password = md5(values.password)
          this.$store.dispatch('Login', loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              this.loginBtnDisable = false
            })
        } else {
          this.loginBtnDisable = false
        }
      })
    },
    loginSuccess (res) {
      this.$store.dispatch('GetInfo')
      const redirect = this.$route.query.redirect
      if (redirect != null && redirect !== undefined && redirect !== '') {
        this.$router.push({ path: redirect })
      } else {
        this.$router.push({ path: '/' })
      }
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `欢迎回来`,
          duration: 2
        })
      }, 1000)
    },
    requestFailed (err) {
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
        width: 100%;
        height: 40px;
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
