<template>
  <div>
    <header class=" relative z-50 fixed top-0 w-full shadow">

      <nav id="main-nav" class=" mx-auto p-6 lg:p-0 flex items-center justify-between">
        <a href="" class="flex  items-center brand " aria-label="Page d'acceuil">

          <img src="../images/logo.png" alt="" class="hidden  lg:w-30 lg:h-20 lg:inline lg:mr-4 ">
          <span aria-hidden="true" class="text-lg lg:text-xl ">
          Garage <strong>Vincent Parot</strong>
        </span>

        </a>
        <button aria-label="toggle button" aria-expanded="false" v-on:click="toggleNav" id="menu-btn"
                class="cursor-pointer w-7 md:hidden">
        <span v-if="menuActive">
           <X/>
        </span>
          <span v-else>
            <Menu/>
         </span>

        </button>
        <ul
            id="toggled-menu"
            class=" hideMenu  w-full absolute top-full left-0  -z-50 bg-[#D9777F] md:bg-transparent border-b border-gray-200 flex flex-col
items-center md:static md:z-50 md:w-min md:transform-none md:border-none md:flex-row md:w-auto"
        >
          <li class="py-4 md:py-0 md:mr-6 ">
            <nuxt-link to="/" class="text-sm uppercase  w-full text-[#262526]
           md:text-[#F2F2F2] hover:text-[#F2F2F2] md:hover:text-[#262526] ">Acceuil
            </nuxt-link>
          </li>

          <li class="py-4 md:py-0 md:mr-6">
            <nuxt-link to="/occasions" class="text-sm uppercase  w-full text-[#262526]
           md:text-[#F2F2F2] hover:text-[#F2F2F2]  md:hover:text-[#262526] ">Nos occasions
            </nuxt-link>
          </li>
          <li class="py-4 md:py-0 md:mr-6">
            <nuxt-link to="#"  :onClick="toggleModal"  class="text-sm uppercase w-full text-[#262526] hover:text-[#F2F2F2]
          md:text-[#F2F2F2] md:hover:text-[#262526] ">Nous contacter
            </nuxt-link>
          </li>
          <li class="py-4 md:py-0 md:mr-6">
            <a href="#" class="text-sm uppercase  w-full text-[#262526] hover:text-[#F2F2F2]
          md:text-[#F2F2F2] md:hover:text-[#262526] ">Espace pro
            </a>
          </li>
        </ul>

      </nav>

    </header>

  </div>

</template>

<script setup lang="js">
import {Menu} from 'lucide-vue-next'
import {X} from 'lucide-vue-next'
import {useConstactStore} from "~/stores/contactFormsStore.js";
import pinia from "~/stores/index.ts";

const contactStore = useConstactStore(pinia())
function toggleModal() {
  contactStore.toggleModal()
}
</script>
<script lang="js">
import {render} from "vue";

export default {

  data() {
    return {
      menuActive: false,

    }

  },

  methods: {
    toggleNav() {
      const toggleMenuBtn = document.querySelector('#menu-btn')
      const menuLinks = document.querySelector('#main-nav ul a ')
      const toggledMenu = document.querySelector('#toggled-menu')
      toggledMenu.classList.toggle('hideMenu')

      if (toggledMenu.classList.contains("hideMenu")) {

        this.menuActive = false
        toggleMenuBtn.setAttribute("aria-expended", "false")

      } else {
        this.menuActive = true
        toggleMenuBtn.setAttribute("aria-expended", "true")

      }

    },

  }
}
</script>

<style scoped>
header {
  background-color: #D92332;
  color: #F2F2F2;


}

@media (max-width: 768px ) {
  .hideMenu {
    transform: translateY(-130%);
  }


}


</style>