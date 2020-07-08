import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => {
    console.error('%c ' + err, 'font-weight:bold; font-size:13px;')
    return err
  })
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
