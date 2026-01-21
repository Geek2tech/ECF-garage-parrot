export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const path = event.context.params?.path || ''
    const method = event.method

    // Build the target URL
    const targetUrl = `${config.public.API_URL}/${path}`

    // Get request body for non-GET requests
    let body = undefined
    if (method !== 'GET' && method !== 'HEAD') {
        body = await readBody(event)
    }

    // Forward headers but add the API key
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
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
        const response = await $fetch.raw(targetUrl, {
            method: method as any,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'include',
        })

        // Forward set-cookie headers from backend
        const setCookie = response.headers.get('set-cookie')
        if (setCookie) {
            appendResponseHeader(event, 'set-cookie', setCookie)
        }

        return response._data
    } catch (error: any) {
        // Forward error status and message
        const statusCode = error.response?.status || 500
        const message = error.response?._data || error.message || 'Proxy error'

        throw createError({
            statusCode,
            message: typeof message === 'string' ? message : JSON.stringify(message)
        })
    }
})
