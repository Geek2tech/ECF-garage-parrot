import {defineStore} from 'pinia'


export const useUserStore = defineStore('User', {

    state: () => {
        return {
            isAuth: false,
            jwt: "",
            xsrfToken: "",
            role: "",
            firstName:"",
            lastName:""
        }
    },
    actions: {

        logout() {
            const token = useCookie('token')
            this.isAuth = false
            token.value = null
        },

        async login(user, password) {


            const body = {
                "email": user,
                "password": password,
            }


            const runTimeConfigs = useRuntimeConfig()

            const {error, data: userData} = await useAsyncData('User', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/login`, {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`
                            },
                            key: 'login',

                            body: JSON.stringify(body),


                        }
                    )

                }
            )

            if (userData.value) {

                this.isAuth = true

                this.xsrfToken = userData._value.xsrfToken
                this.role = userData._value.userProfil
                this.firstName = userData._value.userFirstName
                this.lastName = userData._value.userLastName





            } else {
                console.log('user ko')
                this.isAuth = false
                this.xsrfToken = "none"



            }


        }
    }
})