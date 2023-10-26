// stores/counter.js
import {defineStore} from 'pinia'


export const useCarStore = defineStore('car', {
    state: () => {
        return {

            carId: null,
            yearFilter: null,
            mileageFilter: null,
            priceFilter: null,
            minYear: null,
            maxYear: null,
            minMileage: null,
            maxMileage: null,
            minPrice:null,
            maxPrice:null,
            activePage: 1


        }},
    getters:{

    },

    actions:{
        setCarId(carId) {
            this.carId = carId
        },
        setPriceFilter(priceFilter) {
          this.priceFilter = priceFilter
        },
        setYearFilter(yearFilter){
            this.yearFilter = yearFilter
        },
        setMileageFilter(mileageFilter){
            this.mileageFilter = mileageFilter
        },
           getMinMax(){
             const runTimeConfigs = useRuntimeConfig()

              const {data:minMaxMileage} =   useAsyncData('MinMaxMileage',() => {
                  return $fetch(`${runTimeConfigs.public.API_URL}/api/car/mileageminmax`,{
                      method: `GET`,
                      mode: "cors",
                      headers: {
                          "content-Type": "application/json",
                          "x-api-key": `${runTimeConfigs.public.API_KEY}`
                      },
                      key: `mileageminmax`,
                      pick:['results']
                  })
              })

              this.minMileage =  minMaxMileage._rawValue?.results[0].min
              this.maxMileage =    minMaxMileage._rawValue?.results[0].max


              const {data:minMaxPrice} =   useAsyncData('MinMaxPrice',() => {
                  return $fetch(`${runTimeConfigs.public.API_URL}/api/car/PriceMinMax`,{
                      method: `GET`,
                      mode: "cors",
                      headers: {
                          "content-Type": "application/json",
                          "x-api-key": `${runTimeConfigs.public.API_KEY}`
                      },
                      key: `MinMaxPrice`,
                      pick:['results']
                  })
              })

              this.minPrice =  minMaxPrice._rawValue?.results[0].min
              this.maxPrice =  minMaxPrice._rawValue?.results[0].max

              const {data:minMaxYear} =   useAsyncData('MinMaxYear',() => {
                  return $fetch(`${runTimeConfigs.public.API_URL}/api/car/CirculationYearMinMax`,{
                      method: `GET`,
                      mode: "cors",
                      headers: {
                          "content-Type": "application/json",
                          "x-api-key": `${runTimeConfigs.public.API_KEY}`
                      },
                      key: `CirculationYearMinMax`,
                      pick:['results']
                  })
              })

              this.minYear =  minMaxYear._rawValue?.results[0].min
              this.maxYear =  minMaxYear._rawValue?.results[0].max

         },
         getCars(){
console.log("on rentre dans getcars")
              const body ={

                  priceFilter: this.priceFilter,
                  circulationYearFilter:this.yearFilter,
                  mileageFilter:this.mileageFilter,
                  car_id:this.carId

              }
              console.log('body ',JSON.stringify(body))

            const runTimeConfigs = useRuntimeConfig()

            const {error , data: cars} =  useAsyncData('Cars',() => {
                return $fetch(`${runTimeConfigs.public.API_URL}/api/cars`,{
                    method:'POST',
                    mode:'cors',
                    headers: {
                        "content-Type": "application/json",
                        "x-api-key": `${runTimeConfigs.public.API_KEY}`
                    },
                    key:'Cars',
                    body: JSON.stringify(body),
                    params: {
                        page:this.activePage,
                        limit:10
                    }

                })
            })
             console.log(error)



        }

    }

})
