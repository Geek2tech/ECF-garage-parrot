import {defineStore} from "pinia";

export const useServicesStore = defineStore('services', {

    state: () => {
        return {
            services: null
        }
    },
    getters: {},
    actions: {

          loadServices() {
            const runTimeConfigs = useRuntimeConfig()

            const {data: services} =   useAsyncData(`Services`, () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/services`, {
                            method: `GET`,
                            mode: "cors",
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`
                            },
                            key: `ServiceList`,
                            lazy: true,
                            params: {
                                page: "",
                                limit: ""
                            },


                        },
                    )


                },
            )
            this.services = services._rawValue?.results

        },


    }


})