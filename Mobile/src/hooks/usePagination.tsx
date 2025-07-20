import { useState, useEffect } from "react"

type UsePaginationResult<T> = {
    components: T[]
    page: number
    amountOfPages: number
    changePage: (page: number) => void
}

export function usePagination<T>(callback: (page: number) => Promise<{ components: T[], amountOfPages: number }>, initialPage = 1): UsePaginationResult<T> {

    const [components, setComponents] = useState<T[]>([])
    const [page, setPage] = useState(initialPage)
    const [amountOfPages, setAmountOfPages] = useState(1)

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const { components: data, amountOfPages } = await callback(page)
                setComponents(data)
                setAmountOfPages(amountOfPages)
            } catch (error) {
                setComponents([])
                setAmountOfPages(1)
            }
        }

        fetchPage()
    }, [page, callback])

    function changePage(i: number) {
        setPage(i + 1)
    }

    return { components, page, amountOfPages, changePage }
}
