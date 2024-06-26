import App from './App.vue'
import router from './router'
import { createApp } from 'vue'

// Pinia
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'

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

// vue-toastificaiton
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { options } from '@/lib/toastOptions.js'

const app = createApp(App)
const pinia = createPinia()


library.add(fas)

app.use(pinia)
app.use(router)
app.use(BootstrapVue3)
app.use(Toast, options)

const authStore = useAuthStore(pinia)
authStore.initAuth()

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
