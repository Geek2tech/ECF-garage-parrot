import { createPinia, Pinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

let piniaInstance: Pinia|null = null

const pinia = (): Pinia => {
    if (piniaInstance !== null) return piniaInstance

    piniaInstance = createPinia()
    piniaInstance.use(piniaPluginPersistedstate)

    return piniaInstance
}

export default pinia