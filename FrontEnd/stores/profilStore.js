import {defineStore} from "pinia"

export const useProfilStore = defineStore('profil', {

    state:() => {
        return {
            profilList:""
        }
    },

    actions : {
        async getProfils(token) {

            const {error, data: profils} = await useAsyncData('Profils', () => {
                    return $fetch(`/api/proxy/api/protected/profils`, {
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
            this.profilList = profils
        }
    }

})
