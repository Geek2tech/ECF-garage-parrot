import {defineStore} from "pinia"

export const useConstructorStore = defineStore('constructor', {

    state:() => {
        return {
            constructorsList:""
        }
    },

    actions : {
        async getConstructors() {


            const runTimeConfigs = useRuntimeConfig()

            const {error, data: constructors} = await useAsyncData('constructors', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/constructors`, {
                            method: 'GET',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`

                            },
                            key: 'constructors',




                        }
                    )

                }
            )
            this.constructorsList = constructors._rawValue.results



        },
        async addConstructor(name,token) {

            const body = {
                "constructor_name":name
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: constructorAdded} = await useAsyncData('constructorAdded', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/constructor`, {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'constructorAdded',
                            body:JSON.stringify(body)




                        }
                    )

                }
            )

        },
        async updateConstructor(id,name,token){
            const body = {
                "constructorId":id,
                "newValue":name
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: constructorUpdate} = await useAsyncData('ConstructorUpdate', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/constructor`, {
                            method: 'PUT',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'constructorUpdate',
                            body:JSON.stringify(body)




                        }
                    )

                }
            )


        },
    }

})
