import {defineStore} from "pinia"

export const useFuelStore = defineStore('fuel', {

    state:() => {
        return {
            fuelList:""
        }
    },

    actions : {
        async getFuels(token) {


            const runTimeConfigs = useRuntimeConfig()

            const {error, data: fuels} = await useAsyncData('fuels', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/fuels`, {
                            method: 'GET',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token
                            },
                            key: 'fuels',




                        }
                    )

                }
            )
            this.fuelList = fuels._rawValue.results



        }
    }

})