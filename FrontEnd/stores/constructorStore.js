import {defineStore} from "pinia"

export const useConstructorStore = defineStore('constructor', {

    state:() => {
        return {
            constructorsList:""
        }
    },

    actions : {
        async getConstructors() {

            const {error, data: constructors} = await useAsyncData('constructors', () => {
                    return $fetch(`/api/proxy/api/constructors`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                            },
                        }
                    )
                }
            )
            this.constructorsList = constructors._rawValue.results
        },

        async addConstructor(name, token) {

            const body = {
                "constructor_name": name
            }

            const {error, data: constructorAdded} = await useAsyncData('constructorAdded', () => {
                    return $fetch(`/api/proxy/api/protected/constructor`, {
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

        async updateConstructor(id, name, token) {
            const body = {
                "constructorId": id,
                "newValue": name
            }

            const {error, data: constructorUpdate} = await useAsyncData('ConstructorUpdate', () => {
                    return $fetch(`/api/proxy/api/protected/constructor`, {
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

        async deleteConstructor(id, token) {
            const body = {
                "constructorId": id,
            }

            const {error, data: constructorDelete} = await useAsyncData('ConstructorDelete', () => {
                return $fetch(`/api/proxy/api/protected/constructor`, {
                        method: 'DELETE',
                        credentials: 'include',
                        headers: {
                            "content-Type": "application/json",
                            "x-xsrf-token": token
                        },
                        body: body
                    }
                )
            })
        }
    }

})
