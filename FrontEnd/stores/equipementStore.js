import {defineStore} from "pinia"

export const useequipementStore = defineStore('equipements', {

    state:() => {
        return {
            equipementsList:""
        }
    },

    actions : {
        async addEquipement(name, token) {

            const body = {
                "equipement_name": name
            }

            const {error, data: equipementAdded} = await useAsyncData('equipementAdded', () => {
                    return $fetch(`/api/proxy/api/protected/equipement`, {
                            method: 'POST',
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

        async deleteEquipement(id, token) {
            const body = {
                "equipement_id": id
            }

            const {error, data: DeletedEquipement} = await useAsyncData('deletedEquipement', () => {
                    return $fetch(`/api/proxy/api/protected/equipement`, {
                            method: 'DELETE',
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

        async updateEquipements(id, name, token) {
            const body = {
                "equipement_id": id,
                "newValue": name
            }

            const {error, data: equipementUpdate} = await useAsyncData('equipementUpdate', () => {
                    return $fetch(`/api/proxy/api/protected/equipement`, {
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

        async getEquipements() {

            const {error, data: equipements} = await useAsyncData('equipements', () => {
                    return $fetch(`/api/proxy/api/equipements`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                            },
                        }
                    )
                }
            )
            this.equipementsList = equipements._rawValue.results
        }
    }

})
