import axios from 'axios'
import { setUser } from '../reducers/userReducer'
import { API_URL } from '../constants'
export const register = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/registration', {
            email,
            password
        })
        alert(response.data.message)
    } catch (err) {
        alert(err.response.data.message)
    }
}
export const login = (email, password, navigate) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            navigate('disc')
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/auth/auth`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e.response.data.message);
            localStorage.removeItem('token')
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}/files/avatar`, formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}/files/avatar`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}
