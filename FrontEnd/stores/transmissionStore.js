import {defineStore} from "pinia"

export const useTransmissionStore = defineStore('transmission', {

    state:() => {
        return {
            transmissionsList:""
        }
    },

    actions : {
        async getTransmissions() {

            const {error, data: transmissions} = await useAsyncData('transmissions', () => {
                    return $fetch(`/api/proxy/api/transmissions`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                            },
                        }
                    )
                }
            )
            this.transmissionsList = transmissions._rawValue.results
        }
    }

})
