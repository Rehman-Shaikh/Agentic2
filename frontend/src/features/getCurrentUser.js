import api from "../../utils/axios"

 
const getCurrentUser = async () => {
    try {
        const { data } = await api.get("/api/me")
        return data
    } catch (error) {
        // Ignore 400 (unauthorized / no session) to avoid noisy console output
        // if (!error?.response || (error.response && error.response.status !== 400)) {
            console.log(error)
        // }
        return null
    }
}

export default getCurrentUser