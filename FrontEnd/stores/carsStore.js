// stores/counter.js
import {defineStore} from 'pinia'

export const useCarStore = defineStore('car', {
    state: () => {
        return {

            car_id: null,
            yearFilter: null,
            mielageFilter: null,
            priceFilter: null,
            minYear: null,
            maxYear: null,
            minMileage: null,
            maxMileage: null,
            minPrice:null,
            maxPrice:null


        }},
    getters:{

    },

    actions:{
          async getMinMax(){
             const runTimeConfigs = useRuntimeConfig()

             const {data:minMaxMileage} = await  useFetch(`${runTimeConfigs.public.API_URL}/api/car/mileageminmax`,{
                 method: `GET`,
                 mode: "cors",
                 headers: {
                     "content-Type": "application/json",
                     "x-api-key": `${runTimeConfigs.public.API_KEY}`
                 },
                 key: `MinMaxMileage`,
                 pick:['results']
             })


              this.minMileage = await minMaxMileage._rawValue?.results[0].min
              this.maxMileage = await minMaxMileage._rawValue?.results[0].max


              const {data:minMaxPrice} = await  useFetch(`${runTimeConfigs.public.API_URL}/api/car/PriceMinMax`,{
                  method: `GET`,
                  mode: "cors",
                  headers: {
                      "content-Type": "application/json",
                      "x-api-key": `${runTimeConfigs.public.API_KEY}`
                  },
                  key: `MinMaxPrice`,
                  pick:['results']
              })

              this.minPrice = await minMaxPrice._rawValue?.results[0].min
              this.maxPrice = await minMaxPrice._rawValue?.results[0].max

              const {data:minMaxYear} = await  useFetch(`${runTimeConfigs.public.API_URL}/api/car/CirculationYearMinMax`,{
                  method: `GET`,
                  mode: "cors",
                  headers: {
                      "content-Type": "application/json",
                      "x-api-key": `${runTimeConfigs.public.API_KEY}`
                  },
                  key: `CirculationYearMinMax`,
                  pick:['results']
              })

              this.minYear = await minMaxYear._rawValue?.results[0].min
              this.maxYear = await minMaxYear._rawValue?.results[0].max

         }

    }

})
