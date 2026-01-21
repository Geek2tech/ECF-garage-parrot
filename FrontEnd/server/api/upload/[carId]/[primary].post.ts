export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const carId = event.context.params?.carId
    const primary = event.context.params?.primary

    // Get the multipart form data
    const formData = await readMultipartFormData(event)
    if (!formData || formData.length === 0) {
        throw createError({
            statusCode: 400,
            message: 'No file uploaded'
        })
    }

    // Reconstruct FormData for backend
    const backendFormData = new FormData()
    for (const field of formData) {
        if (field.filename) {
            const blob = new Blob([field.data], { type: field.type || 'application/octet-stream' })
            backendFormData.append(field.name || 'file', blob, field.filename)
        } else {
            backendFormData.append(field.name || 'field', field.data.toString())
        }
    }

    // Forward headers
    const headers: Record<string, string> = {
        'x-api-key': config.API_KEY,
    }

    // Forward xsrf token if present
    const xsrfToken = getHeader(event, 'x-xsrf-token')
    if (xsrfToken) {
        headers['x-xsrf-token'] = xsrfToken
    }

    // Forward cookies for JWT auth
    const cookie = getHeader(event, 'cookie')
    if (cookie) {
        headers['cookie'] = cookie
    }

    try {
        const targetUrl = `${config.public.API_URL}/api/protected/photo/${carId}/${primary}`
        const response = await $fetch(targetUrl, {
            method: 'POST',
            headers,
            body: backendFormData,
        })

        return response
    } catch (error: any) {
        const statusCode = error.response?.status || 500
        const message = error.response?._data || error.message || 'Upload error'

        throw createError({
            statusCode,
            message: typeof message === 'string' ? message : JSON.stringify(message)
        })
    }
})
