// stores/counter.js
import {defineStore, skipHydrate} from 'pinia'
import {suppressSpecialChar} from "~/helpers/fieldControl.js";


export const useCarStore = defineStore('car', {
    state: () => {
        return {

            carId: 'all',
            yearFilter: '',
            mileageFilter: '',
            priceFilter: '',
            carList: {},
            equipementList: {},
            photoList: {},
            minMaxYear: {},
            minMaxPrice: {},
            minMaxMileage: {},
            activePage: 1,
            nbPage: ""


        }
    },
    getters: {},

    actions: {
        setCarId(carId) {
            this.carId = carId
        },

        setMinMaxMileage(min, max) {
            this.minMaxMileage = {
                min: min,
                max: max
            }
        },
        setMinMaxPrice(min, max) {
            this.minMaxPrice = {
                min: min,
                max: max
            }

        },
        setMinMaxYear(min, max) {
            this.minMaxYear = {
                min: min,
                max: max
            }
        },
        activePageDecrement() {
            this.activePage--
            console.log(this.activePage)
        },
        activePageIncrement() {
            this.activePage++

        },
        async add(car, token) {

            const body = {
                "price": car.price,
                "circulation_year": car.year,
                "mileage": car.mileage,
                "horse_power": car.horsePower,
                "fiscal_power": car.fiscalPower,
                "doors": car.doors,
                "cylinder_capacity": car.cylinderCapacity,
                "motor_type": car.motorType,
                "model_name": car.modelName,
                "color": car.color,
                "fuel_id": car.fuel,
                "towing_id": car.mode,
                "transmission_id": car.transmission,
                "constructor_id": car.constructor,

            }

            const runTimeConfigs = useRuntimeConfig()

            const {error, data: carAdded} = await useAsyncData('CarAdd', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/car`, {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token": token

                            },
                            key: 'carAdded',
                            body: JSON.stringify(body)

                        }
                    )

                }
            )
            return carAdded

        },
        delete(id, token) {

            const runTimeConfigs = useRuntimeConfig()


            const {data: carRemoved} = useAsyncData(`CarRemoved`, () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/car/${id}`, {
                            method: `DELETE`,
                            mode: "cors",
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token": token
                            },
                            key: `CarDeleted`,


                        },
                    )


                },
            )


        },

        async getMinMax() {
            const runTimeConfigs = useRuntimeConfig()

            const {data: carMinMax} = await useAsyncData('CarMinMax', () => {
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


            this.setMinMaxMileage(carMinMax._rawValue?.results[0].min_mileage, carMinMax._rawValue?.results[0].max_mileage)
            this.setMinMaxPrice(carMinMax._rawValue?.results[0].min_price, carMinMax._rawValue?.results[0].max_price)
            this.setMinMaxYear(carMinMax._rawValue?.results[0].min_year, carMinMax._rawValue?.results[0].max_year)


        },
        async getCars(carId, price, year, mileage, limit) {

            const body = {


                "priceFilter": price,
                "circulationYearFilter": year,
                "mileageFilter": mileage,
                "car_id": carId

            }


            const runTimeConfigs = useRuntimeConfig()

            const {error, data: cars} = await useAsyncData('Cars', () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/cars`, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`
                            },
                            key: 'Cars',
                            lazy: true,
                            body: JSON.stringify(body),
                            params: {
                                page: this.activePage,
                                limit: limit
                            },


                        }
                    )

                }
            )
            this.carList = cars
            this.nbPage = this.carList?.pages


        },
        async getCarEquipement(id) {
            const runTimeConfigs = useRuntimeConfig()
            const body = {
                car_id: id
            }

            const {data: equipements} = await useAsyncData('equipements', () => {
                return $fetch(`${runTimeConfigs.public.API_URL}/api/carEquipements`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "content-Type": "application/json",
                        "x-api-key": `${runTimeConfigs.public.API_KEY}`
                    },
                    key: 'equipements',
                    lazy: true,
                    body: JSON.stringify(body),
                    params: {
                        page: "",
                        limit: ""
                    }

                })
            })
            this.equipementList = equipements

        },
        async addCarEquipement(carId, equipementId, token) {
            const runTimeConfigs = useRuntimeConfig()
            const body = {
                car_id: carId,
                equipement_id: equipementId
            }

            const {data: addEquipement} = await useAsyncData('AddEequipement', () => {
                return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/carEquipement`, {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        "content-Type": "application/json",
                        "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                        "x-xsrf-token": token
                    },
                    key: 'addEquipement',
                    lazy: true,
                    body: JSON.stringify(body),
                    params: {
                        page: "",
                        limit: ""
                    }

                })
            })


        },
        async getCarPhotos(id) {
            const runTimeConfigs = useRuntimeConfig()


            const {data: carPhotos} = await useAsyncData('carPhotos', () => {
                return $fetch(`${runTimeConfigs.public.API_URL}/api/photos/${id}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "content-Type": "application/json",
                        "x-api-key": `${runTimeConfigs.public.API_KEY}`
                    },
                    key: 'carPhotos',
                    lazy: true,

                    params: {
                        page: "",
                        limit: ""
                    }

                })
            })
            this.photoList = carPhotos
        }
    },


})
