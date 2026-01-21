import {defineStore} from 'pinia'

export const useTowingStore = defineStore('towing', {
    state:() => {
        return {
            towingList:""
        }
    },
    actions: {
        async getTowing() {

            const {error, data: towings} = await useAsyncData('towings', () => {
                    return $fetch(`/api/proxy/api/towings`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                            },
                        }
                    )
                }
            )
            this.towingList = towings?._rawValue.results
        }
    }
})
