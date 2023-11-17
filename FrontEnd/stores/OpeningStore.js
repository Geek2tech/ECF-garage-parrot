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
        async update(day,morningStart,morningEnd,afternoonStart,afternoonEnd,token){

            const body = {
                "day":day,
                "morning_open":morningStart ,
                "morning_close":morningEnd ,
                "afternoon_open":afternoonStart ,
                "afternoon_close":afternoonEnd
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: openingUpdate} = await useAsyncData('openingUpdate', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/opening`, {
                            method: 'PUT',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'openingUpdate',
                            body:JSON.stringify(body)
                        }
                    )

                }
            )

        },


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

        },
        async getAllOpeningHours(){
            const runTimeConfigs = useRuntimeConfig()


            const {data: AllopeningHours} = await useAsyncData(`AllOpeningHours`,() => {
                return $fetch(`${runTimeConfigs.public.API_URL}/api/getallopening`, {
                        method: `GET`,
                        mode: "cors",
                        headers: {
                            "content-Type": "application/json",
                            "x-api-key": `${runTimeConfigs.public.API_KEY}`
                        },



                    }
                )

            })
            this.openingHours = await AllopeningHours._rawValue?.results

        }

    }



})