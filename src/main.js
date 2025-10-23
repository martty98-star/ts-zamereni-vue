import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import { router } from './router'
import { autofillFromUrl } from './utils/urlAutofill'
import { processQueue } from './utils/queue'
import { state } from './store/formState'

// Create and mount app
const app = createApp(App)
app.use(router)
app.mount('#app')

// URL autofill - vyplní formulář z URL parametrů
autofillFromUrl(state)

// Process offline queue when app starts
processQueue()

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('[SW] Service worker registered:', registration)
      })
      .catch((error) => {
        console.warn('[SW] Service worker registration failed:', error)
      })
  })
}

// Set app ready flag
window.formAppReady = true
