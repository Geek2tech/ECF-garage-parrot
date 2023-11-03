import {defineStore} from "pinia"

export const useTransmissionStore = defineStore('transmission', {

    state:() => {
        return {
            transmissionsList:""
        }
    },

    actions : {
        async getTransmissions() {


            const runTimeConfigs = useRuntimeConfig()

            const {error, data: transmissions} = await useAsyncData('transmissions', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/transmissions`, {
                            method: 'GET',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,

                            },
                            key: 'transmissions',




                        }
                    )

                }
            )
            this.transmissionsList = transmissions._rawValue.results



        }
    }

})