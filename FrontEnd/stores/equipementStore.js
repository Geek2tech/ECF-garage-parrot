import {defineStore} from "pinia"

export const useequipementStore = defineStore('equipements', {

    state:() => {
        return {
            equipementsList:""
        }
    },

    actions : {
        async addEquipement(name,token) {

            const body = {
                "equipement_name":name
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: equipementAdded} = await useAsyncData('equipementAdded', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/equipement`, {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'equipementAdded',
                            body:JSON.stringify(body)




                        }
                    )

                }
            )

        },
        async updateEquipements(id,name,token){
            const body = {
                "equipement_id":id,
                "newValue":name
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: equipementUpdate} = await useAsyncData('equipementUpdate', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/equipement`, {
                            method: 'PUT',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'equipementupdate',
                        body:JSON.stringify(body)




                        }
                    )

                }
            )


        },

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