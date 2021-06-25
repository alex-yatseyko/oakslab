import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)

    const request = useCallback(async (url: string, method: string = 'GET', body: any = null) => {
        setLoading(true)
        try {
            const response = await fetch(url, {method, body})
            const data = await response.json()

            if(!response.ok) {
                throw new Error('Something went wrong')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e)
            throw e
        }
    }, [])  

    return { loading, request, error }
}