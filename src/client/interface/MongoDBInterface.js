import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const addToken = payload => api.post(`/token`, payload)
export const getTokens = () => api.get(`/tokens`)
export const getTokenById = id => api.get(`/token/${id}`)

const MongoDBInterface = {
    addToken,
    getTokens,
    getTokenById,
}

export default MongoDBInterface