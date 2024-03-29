// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '主页' },
    redirect: '/dashboard/workplace',
    children: [
      {
        path: '/template',
        name: 'template',
        redirect: '/template/list1',
        component: RouteView,
        meta: { title: '模板', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/template/list1',
            name: 'list1',
            component: () => import('@/views/template/list/TemplateList'),
            meta: { title: '模板列表1', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      }, {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/simple/Simple'),
            meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ] }
          }, {
            path: '/dashboard/leftListRightTree',
            name: 'leftListRightTree',
            component: () => import('@/views/template/leftListRightTree/leftListRightTree'),
            meta: { title: '左列表右树形', keepAlive: false, permission: [ 'dashboard' ] }
          }, {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/simple/Simple'),
            meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      }, {
        path: '/form',
        name: 'form',
        redirect: '/form/componentForm',
        component: RouteView,
        meta: { title: '表单', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/form/componentForm',
            name: '所有控件表单',
            component: () => import('@/views/form/ComponentForm'),
            meta: { title: '所有控件表单', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      }, {
        path: '/list',
        name: 'list',
        component: RouteView,
        redirect: '/list/table-list',
        meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/simple/Simple1'),
            meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
          }, {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/simple/Simple2'),
            meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
          }, {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/simple/Simple3'),
            meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
          }, {
            path: '/list/search',
            name: 'SearchList',
            component: RouteView, // 有子菜单，父菜单只能是 component: RouteView
            // component: () => import('@/views/simple/Simple'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
            children: [{
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('@/views/list/List'),
                meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
              }, {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('@/views/simple/Simple2'),
                meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
              }, {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('@/views/list/List'),
                meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
              }
            ]
          }
        ]
      }, {
        path: '/result',
        name: 'result',
        component: RouteView,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          }, {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },

      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          }, {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          }, {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/simple/Simple2'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          }, {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/simple/Simple3'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/simple/Simple'),
                meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
              }, {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/simple/Simple1'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }, {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/simple/Simple2'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }, {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/simple/Simple3'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }, {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/simple/Simple'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      }
    ]
  }, { // 必须放到最后
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  }, {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
