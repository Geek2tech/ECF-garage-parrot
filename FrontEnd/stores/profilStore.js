import {defineStore} from "pinia"

export const useProfilStore = defineStore('profil', {

    state:() => {
        return {
            profilList:""
        }
    },

    actions : {
        async getProfils(token) {


            const runTimeConfigs = useRuntimeConfig()

            const {error, data: profils} = await useAsyncData('Profils', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/profils`, {
                            method: 'GET',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token
                            },
                            key: 'profils',




                        }
                    )

                }
            )
this.profilList = profils



        }
    }

})