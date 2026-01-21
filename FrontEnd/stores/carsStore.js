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

            const {error, data: carAdded} = await useAsyncData('CarAdd', () => {
                    return $fetch(`/api/proxy/api/protected/car`, {
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

            return carAdded

        },
        delete(id, token) {

            const {data: carRemoved} = useAsyncData(`CarRemoved`, () => {
                    return $fetch(`/api/proxy/api/protected/car/${id}`, {
                            method: `DELETE`,
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-xsrf-token": token
                            },

                        },
                    )


                },
            )


        },

        async getMinMax() {

            const {data: carMinMax} = await useAsyncData('CarMinMax', () => {
                return $fetch(`/api/proxy/api/car/minmax`, {
                    method: `GET`,
                    headers: {
                        "content-Type": "application/json",
                    },

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

            const {error, data: cars} = await useAsyncData('Cars', () => {
                    return $fetch(`/api/proxy/api/cars`, {
                            method: 'POST',
                            headers: {
                                "content-Type": "application/json",
                            },
                            lazy: true,
                            body: body,
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
            const body = {
                car_id: id
            }

            const {data: equipements} = await useAsyncData('equipements', () => {
                return $fetch(`/api/proxy/api/carEquipements`, {
                    method: 'POST',
                    headers: {
                        "content-Type": "application/json",
                    },
                    lazy: true,
                    body: body,
                    params: {
                        page: "",
                        limit: ""
                    }

                })
            })
            this.equipementList = equipements

        },
        async addCarEquipement(carId, equipementId, token) {
            const body = {
                car_id: carId,
                equipement_id: equipementId
            }

            const {data: addEquipement} = await useAsyncData('AddEequipement', () => {
                return $fetch(`/api/proxy/api/protected/carEquipement`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "content-Type": "application/json",
                        "x-xsrf-token": token
                    },
                    lazy: true,
                    body: body,
                    params: {
                        page: "",
                        limit: ""
                    }

                })
            })


        },

        async getCarPhotos(id) {

            const {data: carPhotos} = await useAsyncData('carPhotos', () => {
                return $fetch(`/api/proxy/api/photos/${id}`, {
                    method: 'GET',
                    headers: {
                        "content-Type": "application/json",
                    },
                    lazy: true,

                    params: {
                        page: "",
                        limit: ""
                    }

                })
            })
            this.photoList = carPhotos
        },
        async addCarPhoto(carId, primary, photo, token) {
            const body = new FormData()
            body.append("file", photo)

            const {data: addCarPhoto} = await useAsyncData('AddCarPhoto', () => {
                return $fetch(`/api/upload/${carId}/${primary}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "x-xsrf-token": token
                    },
                    lazy: true,
                    body: body,
                })
            })


        },
    },



})
