import {defineStore} from "pinia"

export const useFuelStore = defineStore('fuel', {

    state:() => {
        return {
            fuelList:""
        }
    },

    actions : {
        async deleteFuel(id, token) {

            const body = {
                "fuel_id": id
            }

            const {error, data: deletedFuel} = await useAsyncData('deletedFuel', () => {
                    return $fetch(`/api/proxy/api/protected/fuel`, {
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

        async addFuel(name, token) {

            const body = {
                "fuel_name": name
            }

            const {error, data: fuelAdded} = await useAsyncData('fuelAdd', () => {
                    return $fetch(`/api/proxy/api/protected/fuel`, {
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

        async updateFuel(id, name, token) {

            const body = {
                "fuelId": id,
                "newValue": name
            }

            const {error, data: fuelUpdate} = await useAsyncData('fuelUpdate', () => {
                    return $fetch(`/api/proxy/api/protected/fuel`, {
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

        async getFuels(token) {

            const {error, data: fuels} = await useAsyncData('fuels', () => {
                    return $fetch(`/api/proxy/api/fuels`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-xsrf-token": token
                            },
                        }
                    )
                }
            )
            this.fuelList = fuels._rawValue.results
        }
    }

})
