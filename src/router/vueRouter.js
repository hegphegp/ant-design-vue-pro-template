import router from '../router'
import storage from 'store'
import store from '../store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle } from '@/utils/util'
import config from '@/config/antDesignUiSettings'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

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
        store.dispatch('AddRouters')
        // 动态添加可访问路由表
        router.addRoutes(store.getters.routers)
        // 请求带有 redirect 重定向时，登录自动重定向到该地址
        const redirect = decodeURIComponent(from.query.redirect || to.path)
        if (to.path === redirect) { // set the replace: true so the navigation will not leave a history record
          next({ ...to, replace: true })
        } else {
          next({ path: redirect }) // 跳转到目的路由
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) { // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
