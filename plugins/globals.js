import Vue from 'vue'
import VueMarkdown from 'vue-markdown'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'

// Установка element-ui
Vue.use(Element, { locale })

// Устанавливаем компонент глобально
Vue.component('vue-markdown', VueMarkdown)
