// stores/counter.js
import {defineStore, skipHydrate} from 'pinia'


export const useCarStore = defineStore('car', {
    state: () => {
        return {

            carId: 'all',
            yearFilter: '',
            mileageFilter: '',
            priceFilter: '',
            carList: {},

            minMaxYear: {},
           minMaxPrice: {},
           minMaxMileage:{},
            activePage: 1


        }
    },
    getters: {

    },

    actions: {
        setCarId(carId) {
            this.carId = carId
        },
        setPriceFilter(priceFilter) {
            this.priceFilter = priceFilter?.toString()
        },
        setYearFilter(yearFilter) {
            this.yearFilter = yearFilter?.toString()
        },
        setMileageFilter(mileageFilter) {
            this.mileageFilter = mileageFilter?.toString()

        },
        setMinMaxMileage(min,max){
            this.minMaxMileage ={
                min : min,
                max: max
            }
        },
        setMinMaxPrice(min,max){
            this.minMaxPrice = {
                min: min,
                max: max
            }

        },
        setMinMaxYear(min,max) {
            this.minMaxYear = {
                min: min,
                max: max
            }
        },

         async getMinMax() {
            const runTimeConfigs = useRuntimeConfig()

            const {data: carMinMax} = await  useAsyncData('CarMinMax', () => {
                return $fetch(`${runTimeConfigs.public.API_URL}/api/car/minmax`, {
                    method: `GET`,
                    mode: "cors",
                    headers: {
                        "content-Type": "application/json",
                        "x-api-key": `${runTimeConfigs.public.API_KEY}`
                    },
                    key: `CarMinMax`,

                    pick: ['results']
                })
            })


            this.setMinMaxMileage(carMinMax._rawValue?.results[0].min_mileage,carMinMax._rawValue?.results[0].max_mileage)
            this.setMinMaxPrice(carMinMax._rawValue?.results[0].min_price,carMinMax._rawValue?.results[0].max_price)
            this.setMinMaxYear(carMinMax._rawValue?.results[0].min_year,carMinMax._rawValue?.results[0].max_year)


        },
       async getCars(carId,price,year,mileage) {

            const  body = {


                "priceFilter":  price,
                "circulationYearFilter": year,
                "mileageFilter": mileage,
                "car_id": carId

            }
            console.log('body ', JSON.stringify(body))

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: cars} = useAsyncData('Cars', () => {
                return $fetch(`${runTimeConfigs.public.API_URL}/api/cars`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "content-Type": "application/json",
                        "x-api-key": `${runTimeConfigs.public.API_KEY}`
                    },
                    key: 'Cars',
                    lazy:true,
                    body: JSON.stringify(body),
                    params: {
                        page: this.activePage,
                        limit: 10
                    }

                })
            })
this.carList =cars



        }

    }

})
