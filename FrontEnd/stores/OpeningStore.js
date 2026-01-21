import {defineStore} from "pinia";

export const useOpeningStore = defineStore('opening', {

    state() {
        return {
            openingHours : null
        }
    },

    getters:{},

    actions:{
        async update(day, morningStart, morningEnd, afternoonStart, afternoonEnd, token) {

            const body = {
                "day": day,
                "morning_open": morningStart,
                "morning_close": morningEnd,
                "afternoon_open": afternoonStart,
                "afternoon_close": afternoonEnd
            }

            const {error, data: openingUpdate} = await useAsyncData('openingUpdate', () => {
                    return $fetch(`/api/proxy/api/protected/opening`, {
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

        async getOpeningHours() {

            const {data: openingHours} = await useAsyncData(`OpeningHours`, () => {
                return $fetch(`/api/proxy/api/openinghours`, {
                        method: `GET`,
                        headers: {
                            "content-Type": "application/json",
                        },
                    }
                )
            })
            this.openingHours = await openingHours._rawValue?.results
        },

        async getAllOpeningHours() {

            const {data: AllopeningHours} = await useAsyncData(`AllOpeningHours`, () => {
                return $fetch(`/api/proxy/api/getallopening`, {
                        method: `GET`,
                        headers: {
                            "content-Type": "application/json",
                        },
                    }
                )
            })
            this.openingHours = await AllopeningHours._rawValue?.results
        }
    }
})
