import {useUserStore} from "~/stores/userStore.js";
import pinia from "~/stores/index.ts";
import { jwtDecode} from "jwt-decode";

export default  defineNuxtRouteMiddleware((to, from) => {
    console.log('From auth middleware')

    const userStore = useUserStore(pinia())
    const router = useRouter()
    if (userStore.isAuth === true) {
        console.log('autorisation ok')

    } else {
        console.log('autorisation ko')
        router.push('/login')

    }




})