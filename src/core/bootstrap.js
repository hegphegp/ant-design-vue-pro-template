import store from '@/store'
import storage from 'store'
import defaultSettings from '@/config/defaultSettings'

export default function Initializer () {
  store.commit('layout', storage.get('layout', defaultSettings.layout))
  store.commit('fixedHeader', storage.get('fixed_header', defaultSettings.fixedHeader))
  store.commit('fixedSidebar', storage.get('fixed_sidebar', defaultSettings.fixSiderbar))
  store.commit('contentWidth', storage.get('content_width', defaultSettings.contentWidth))
  store.commit('autoHideHeader', storage.get('auto_hide_header', defaultSettings.autoHideHeader))
  store.commit('navTheme', storage.get('nav_theme', defaultSettings.navTheme))
  store.commit('weak', storage.get('weak', defaultSettings.colorWeak))
  store.commit('color', storage.get('color', defaultSettings.primaryColor))
  store.commit('SET_TOKEN', storage.get('Access-Token'))
  // last step
}
