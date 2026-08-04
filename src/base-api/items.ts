import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getItems = async () => {
    try {
        const response = await axios.get(`${baseUrl}/get-items`)
        console.log(response.data)
        return response?.data?.data

    } catch (error) {
        console.log(error)
    }
}

export const getItemById = async(id: string) => {
    try {
        const response = await axios.post(`${baseUrl}/get-items`,{
            id
        })
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}