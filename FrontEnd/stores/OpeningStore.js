import {defineStore} from "pinia";

export const useOpeningStore = defineStore('opening', {

    state() {
        return {
            openingHours : null
        }


    },

    getters:{

    },
    actions:{
       async getOpeningHours(){
            const runTimeConfigs = useRuntimeConfig()


            const {data: openingHours} = await useAsyncData(`OpeningHours`,() => {
                return $fetch(`${runTimeConfigs.public.API_URL}/api/openinghours`, {
                        method: `GET`,
                        mode: "cors",
                        headers: {
                            "content-Type": "application/json",
                            "x-api-key": `${runTimeConfigs.public.API_KEY}`
                        },



                    }
                )

            })
            this.openingHours = await openingHours._rawValue?.results

        }

    }



})