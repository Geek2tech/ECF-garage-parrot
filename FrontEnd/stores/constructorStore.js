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



        }
    }

})
