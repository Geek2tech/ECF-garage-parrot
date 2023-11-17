import {defineStore} from 'pinia'

export const useTowingStore = defineStore('towing',{
    state:() => {
        return {
            towingList:""
        }
    },
    actions: {
        async getTowing() {

            const runTimeConfigs = useRuntimeConfig()
            const {error, data: towings} = await useAsyncData('towings', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/towings`, {
                            method: 'GET',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,

                            },
                            key: 'fuels',




                        }
                    )

                }
            )
            this.towingList = towings?._rawValue.results

        }
    }
})