import {defineStore} from "pinia";

export const useServicesStore = defineStore('services', {

    state: () => {
        return {
            services: null
        }
    },
    getters: {},
    actions: {
        async update(id,name,description,token){

            const body = {
                "serviceId":id,
                "newValue":name,
                "description":description
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: serviceUpdate} = await useAsyncData('serviceUpdate', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/service`, {
                            method: 'PUT',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'serviceupdate',
                            body:JSON.stringify(body)
                        }
                    )

                }
            )

        },
         async loadServices() {
            const runTimeConfigs = useRuntimeConfig()

            const {data: services} = await  useAsyncData(`Services`, () => {
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