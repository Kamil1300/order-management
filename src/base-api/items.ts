import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getItems = async () => {
    try {
        const response = await axios.get(`${baseUrl}/get-items`)
        return response?.data

    } catch (error) {
        console.log(error)
    }
}