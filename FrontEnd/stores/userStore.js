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
            userList: ""
        }
    },

    actions: {
        async delete(email, token) {

            const body = {
                "email": email
            }

            const {error, data: userDeleted} = await useAsyncData('deleteUser', () => {
                    return $fetch(`/api/proxy/api/protected/user`, {
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
            return userDeleted

        },
        async add(firstName, lastName, email, profil, token) {

            const body = {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "profil": profil
            }

            const {error, data: userAdded} = await useAsyncData('UserAdd', () => {
                    return $fetch(`/api/proxy/api/protected/user`, {
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

            return userAdded

        },
        async update(uuid, firstsName, lastName, email, profil, token) {

            const body = {
                "user_uuid": uuid,
                "first_name": firstsName,
                "last_name": lastName,
                "email": email,
                "profil": profil
            }

            const {error, data: userUpdate} = await useAsyncData('userUpdate', () => {
                    return $fetch(`/api/proxy/api/protected/user`, {
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
        async resetPassword(email) {

            const body = {
                "email": email,

            }

            const {error, data: emailToReset} = await useAsyncData('User', () => {
                    return $fetch(`/api/proxy/api/password`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                            },
                            body: body,
                        }
                    )

                }
            )

            return emailToReset

        },
        logout() {
            const router = useRouter()
            this.isAuth = false
            sessionStorage.clear()
            navigateTo('/')
        },
        startSessionTimer() {
            const router = useRouter()
            setTimeout(function () {
                this.isAuth = false
                sessionStorage.clear()
                router.push('/')

            }, (15 * 60 * 1000))
        },
        valideEmail(email) {
            const valideEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (email.match(valideEmail) === null) {
                return false

            } else {
                return true
            }
        },
        async getUser(token) {

            const {error, data: users} = await useAsyncData('users', () => {
                    return $fetch(`/api/proxy/api/protected/users`, {
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
            this.userList = users._rawValue.results


        },

        async login(user, password) {


            const body = {
                "email": user,
                "password": password,
            }

            const {error, data: userData} = await useAsyncData('User', () => {
                    return $fetch(`/api/proxy/api/login`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                            },
                            body: body,
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
                sessionStorage.setItem("xsrf", this.xsrfToken)


                this.startSessionTimer()

            } else {

                this.isAuth = false
                this.xsrfToken = "none"
                sessionStorage.clear()


            }


        }
    }
})
