import {defineStore} from "pinia"

export const useFuelStore = defineStore('fuel', {

    state:() => {
        return {
            fuelList:""
        }
    },

    actions : {
        async addFuel(name,token) {

            const body = {
                "fuel_name":name
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: fuelAdded} = await useAsyncData('fuelAdd', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/fuel`, {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'fuelAdded',
                            body:JSON.stringify(body)




                        }
                    )

                }
            )

        },

        async updateFuel(id,name,token){

            const body = {
                "fuelId":id,
                "newValue":name
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: fuelUpdate} = await useAsyncData('fuelUpdate', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/fuel`, {
                            method: 'PUT',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'fuelupdate',
                            body:JSON.stringify(body)




                        }
                    )

                }
            )

        },
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