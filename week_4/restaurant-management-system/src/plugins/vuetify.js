import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary:    '#1C1C1E',
        secondary:  '#C9A84C',
        accent:     '#C45C2E',
        success:    '#7A9E7E',
        info:       '#8B5A2B',
        warning:    '#F5A623',
        error:      '#E53935',
        background: '#FAF8F4',
        surface:    '#FFFFFF'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
