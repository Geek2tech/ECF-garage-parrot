function  getRequest(request,name,methods) {
    const apiKey = process.env.APP_APIKEY
    const {error , data: result} = useAsyncData(`${name}`,() => {
        return $fetch(`${process.env.APP_BACKEND_URL}${request}`, {
                method: `${methods}`,
                mode: "cors",
                headers: {
                    "content-Type": "application/json",
                    "x-api-key": `${apiKey}`
                },
                lazy: true,
                suspense: false,


            }
        )

    })
    return {
        result,
        error

    }

}
export default {
    getRequest
}