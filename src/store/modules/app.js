import storage from 'store'

const app = {
  state: {
    sideCollapsed: false,
    isMobile: false,
    theme: 'dark',
    layout: '',
    contentWidth: '',
    fixedHeader: false,
    fixedSidebar: false,
    autoHideHeader: false,
    color: '',
    weak: false,
    lang: 'en-US',
    _antLocale: {}
  },
  mutations: {
    sidebarType: (state, type) => {
      state.sideCollapsed = type
      storage.set('sidebar_type', type)
    },
    isMobile: (state, isMobile) => {
      state.isMobile = isMobile
    },
    navTheme: (state, theme) => {
      state.theme = theme
      storage.set('nav_theme', theme)
    },
    layout: (state, mode) => {
      state.layout = mode
      storage.set('layout', mode)
    },
    fixedHeader: (state, mode) => {
      state.fixedHeader = mode
      storage.set('fixed_header', mode)
    },
    fixedSidebar: (state, mode) => {
      state.fixedSidebar = mode
      storage.set('fixed_sidebar', mode)
    },
    contentWidth: (state, type) => {
      state.contentWidth = type
      storage.set('content_width', type)
    },
    autoHideHeader: (state, type) => {
      state.autoHideHeader = type
      storage.set('auto_hide_header', type)
    },
    color: (state, color) => {
      state.color = color
      storage.set('color', color)
    },
    weak: (state, mode) => {
      state.weak = mode
      storage.set('weak', mode)
    }
  },
  actions: {
  }
}

export default app
