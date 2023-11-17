import {defineStore} from "pinia";

export const useServicesStore = defineStore('services', {

    state: () => {
        return {
            services: null
        }
    },
    getters: {},
    actions: {
        async deleteService(id,token) {

            const body = {
                "serviceId":id
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: serviceDeleted} = await useAsyncData('deleteService', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/service`, {
                            method: 'DELETE',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'serviceDelete',
                            body:JSON.stringify(body)




                        }
                    )

                }
            )

        },

        async addService(name,description,token) {

            const body = {
                "name":name,
                "description":description
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: serviceAdded} = await useAsyncData('serviceAdd', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/service`, {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'serviceAdded',
                            body:JSON.stringify(body)




                        }
                    )

                }
            )

        },
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