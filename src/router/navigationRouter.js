import router from '.'
import storage from 'store'
import store from '../store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle } from '@/utils/util'
import config from '@/config/ui.config'

NProgress.configure({ showSpinnessr: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 不加下面这一行代码，chrome浏览器页签不会显示中文菜单名称
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${config.title}`))
  if (storage.get('Access-Token')) { /* has token */
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.routers.length === 0) {
        store.dispatch('AddRouters').then(() => { // stroe.commit是同步操作，被调用方法没有请求后端接口的操作，store.dispatch含有异步操作，例如被调用方法有请求后端接口的操作
          // 动态添加可访问路由表
          router.addRoutes(store.getters.routers)
          const redirect = decodeURIComponent(from.query.redirect || to.path) // 判断路由跳转前，上一个页面的URL是否有 redirect 重定向参数，登录自动重定向到该地址
          if (to.path === redirect) { // set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          } else {
            next({ path: redirect }) // 跳转到目的路由
          }
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) { // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } }) // 不用重定向功能
      NProgress.done()
      // next({ path: loginRoutePath })
      // NProgress.done() // 如果当前页是登录页， router.afterEach不会被触发，要手动触发
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
