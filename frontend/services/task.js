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

export const addTask = async (data) => {
    const URL = import.meta.env.VITE_API_URL;
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.post(`${URL}/Pro-Manager/api/v1/task`, data, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Task added.",
            task: response.data.task ? response.data.task : "Task not added."
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}

export const backlog = async () => {
    const URL = import.meta.env.VITE_API_URL;
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.get(`${URL}/Pro-Manager/api/v1/board/task/backlog`, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Backlog tasks fetched successfully.",
            data: response.data.tasks ? response.data.tasks : "Nothing to show."
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}

export const todo = async () => {
    const URL = import.meta.env.VITE_API_URL;
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.get(`${URL}/Pro-Manager/api/v1/board/task/todo`, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "To-do tasks fetched successfully.",
            data: response.data.tasks ? response.data.tasks : "Nothing to show."
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}

export const inprogress = async () => {
    const URL = import.meta.env.VITE_API_URL;
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.get(`${URL}/Pro-Manager/api/v1/board/task/inprogress`, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "In Progress tasks fetched successfully.",
            data: response.data.tasks ? response.data.tasks : "Nothing to show."
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}

export const done = async () => {
    const URL = import.meta.env.VITE_API_URL;
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.get(`${URL}/Pro-Manager/api/v1/board/task/done`, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Completed tasks fetched successfully.",
            data: response.data.tasks ? response.data.tasks : "Nothing to show."
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}
