import {defineStore} from "pinia";

export const useServicesStore = defineStore('services', {

    state: () => {
        return {
            services: null
        }
    },
    getters: {},
    actions: {
        async deleteService(id, token) {

            const body = {
                "serviceId": id
            }

            const {error, data: serviceDeleted} = await useAsyncData('deleteService', () => {
                    return $fetch(`/api/proxy/api/protected/service`, {
                            method: 'DELETE',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-xsrf-token": token
                            },
                            body: body
                        }
                    )
                }
            )
        },

        async addService(name, description, token) {

            const body = {
                "name": name,
                "description": description
            }

            const {error, data: serviceAdded} = await useAsyncData('serviceAdd', () => {
                    return $fetch(`/api/proxy/api/protected/service`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-xsrf-token": token
                            },
                            body: body
                        }
                    )
                }
            )
        },

        async update(id, name, description, token) {

            const body = {
                "serviceId": id,
                "newValue": name,
                "description": description
            }

            const {error, data: serviceUpdate} = await useAsyncData('serviceUpdate', () => {
                    return $fetch(`/api/proxy/api/protected/service`, {
                            method: 'PUT',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-xsrf-token": token
                            },
                            body: body
                        }
                    )
                }
            )
        },

        async loadServices() {

            const {data: services} = await useAsyncData(`Services`, () => {
                    return $fetch(`/api/proxy/api/services`, {
                            method: `GET`,
                            headers: {
                                "content-Type": "application/json",
                            },
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
