import { getData } from "@/api/data"
import { ref, watchEffect } from "vue"

export const useFetch = (url) => {
    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const fetchData = () => {
        data.value = null
        loading.value = true
        error.value = null

        getData(url).then(res => {
            data.value = res.data
            loading.value = false
        })
        .catch(err => {
            error.value = err
        })
    }

    watchEffect(() => {
        fetchData()
    })

    return {
        data,
        loading,
        error
    }
}