async function delDeclared(url) {
    try {
        const res = await fetch(url, { method: 'DELETE' })

        if (!res.ok) {
            let data = {}
            try { data = await res.json() } catch {}
            if (res.status === 404) {
                throw new Error(data.message || 'Not found')
            } else {
                throw new Error('There is a problem. Please try again later.')
            }
        }

        return await res.json()

    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('There is a problem. Please try again later.')
        }
        throw new Error(error.message)
    }
}

export { delDeclared }
