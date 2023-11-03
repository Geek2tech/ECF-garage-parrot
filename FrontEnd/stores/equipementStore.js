import {defineStore} from "pinia"

export const useequipementStore = defineStore('equipements', {

    state:() => {
        return {
            equipementsList:""
        }
    },

    actions : {
        async getEquipements() {


            const runTimeConfigs = useRuntimeConfig()

            const {error, data: equipements} = await useAsyncData('equipements', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/equipements`, {
                            method: 'GET',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,

                            },
                            key: 'equipements',




                        }
                    )

                }
            )
            this.equipementsList = equipements._rawValue.results



        }
    }

})