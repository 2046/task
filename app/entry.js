import Vue from 'vue'
import App from './App'
import Icon from 'vt-icon'
import ICONS from './icons'
import store from './store'
import router from './router'
import eventHub from 'vue-eventhub'
import { webFrame } from 'electron'

webFrame.setZoomFactor(1)
webFrame.setZoomLevelLimits(1, 1)

Icon.add(ICONS)
Vue.use(eventHub)
Vue.component('Icon', Icon)
Vue.config.productionTip = false
Vue.directive('focus', { inserted: (el) => el.focus() })

store.dispatch('init').then(() => {
    new Vue({
        store,
        router,
        ...App
    }).$mount('#app')
})