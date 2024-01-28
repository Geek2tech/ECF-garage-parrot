import {useUserStore} from "~/stores/userStore.js";
import pinia from "~/stores/index.ts";

export default  defineNuxtRouteMiddleware((to, from) => {


const userStore = useUserStore(pinia())
    const router = useRouter()

    if (userStore.isAuth === true && sessionStorage.getItem("xsrf") !== null)  {


    } else {

        navigateTo('/login')

    }




})
