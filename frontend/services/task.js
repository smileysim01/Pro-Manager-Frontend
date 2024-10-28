import axios from 'axios'
import { addTokenToHeader } from '../utils/addToken'

export const analytics = async () => {
    const URL = import.meta.env.VITE_API_URL;
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.get(`${URL}/Pro-Manager/api/v1/analytics`, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Analytics fetched successfully.",
            analytics: response.data.analytics ? response.data.analytics : "Nothing to show."
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}
