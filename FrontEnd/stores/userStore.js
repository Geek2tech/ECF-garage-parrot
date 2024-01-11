import {defineStore} from 'pinia'


export const useUserStore = defineStore('User', {

    state: () => {
        return {
            isAuth: false,
            jwt: "",
            xsrfToken: "",
            role: "",
            firstName: "",
            lastName: "",
            userList:""
        }
    },

    actions: {
        async delete(email,token) {

            const body = {
                "email":email
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: userDeleted} = await useAsyncData('deleteUser', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/user`, {
                            method: 'DELETE',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'userDelete',
                            body:JSON.stringify(body)




                        }
                    )

                }
            )
            return userDeleted

        },
        async add(firstName,lastName,email,profil,token) {

            const body = {
               "first_name":firstName,
                "last_name":lastName,
                "email":email,
                "profil":profil
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: userAdded} = await useAsyncData('UserAdd', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/user`, {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'UserAdded',
                            body:JSON.stringify(body)

                        }
                    )

                }
            )
            return userAdded

        },
        async update(uuid,firstsName,lastName,email,profil,token){

            const body = {
                "user_uuid":uuid,
                "first_name":firstsName,
                "last_name":lastName,
                "email":email,
                "profil":profil
            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: userUpdate} = await useAsyncData('userUpdate', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/user`, {
                            method: 'PUT',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token

                            },
                            key: 'userUpdate',
                            body:JSON.stringify(body)
                        }
                    )

                }
            )

        },
        async resetPassword(email) {

            const body = {
                "email": email,

            }


            const runTimeConfigs = useRuntimeConfig()

            const {error, data: emailToReset} = await useAsyncData('User', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/password`, {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`
                            },
                            key: 'resetPassword',

                            body: JSON.stringify(body),


                        }
                    )

                }
            )

return emailToReset

        },
        logout() {
            const router = useRouter()
            this.isAuth=false
            sessionStorage.clear()
            router.push('/')
        },
        startSessionTimer(){
            const router = useRouter()
            setTimeout(function() {
                this.isAuth = false
                sessionStorage.clear()
                router.push('/')

                }, (15 * 60 * 1000))
        },
        valideEmail(email) {
            const valideEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (email.match(valideEmail) === null) {
                return false

            }else {
                return true
            }
        },
        async getUser (token) {


            const runTimeConfigs = useRuntimeConfig()

            const {error, data: users} = await useAsyncData('users', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/users`, {
                            method: 'GET',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token
                            },
                            key: 'users',




                        }
                    )

                }
            )
            this.userList = users._rawValue.results


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

                if (userData._value === "wrong_credentials" || userData._value === "user_not_found") {

                    this.logout()
                    return
                }
                this.isAuth = true

                this.xsrfToken = userData._value.xsrfToken
                this.role = userData._value.userProfil
                this.firstName = userData._value.userFirstName
                this.lastName = userData._value.userLastName
                sessionStorage.setItem("xsrf",this.xsrfToken)


this.startSessionTimer()

            } else {
                console.log('user ko')
                this.isAuth = false
                this.xsrfToken = "none"
               sessionStorage.clear()


            }


        }
    }
})
