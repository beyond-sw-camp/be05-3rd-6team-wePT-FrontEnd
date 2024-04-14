import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// style
import '../public/assets/main.css'

// Bootstrap
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)
library.add(fas)

app.use(createPinia())
app.use(router)
app.use(BootstrapVue3)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
