import axios from 'axios'
const { uuid } = require('uuidv4');

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const addToken = payload => {
    api.post(`/token`, 
    {
        account: this.account,
        file: payload.file,
        name: payload.tokenName,
        category: payload.tokenCategory,
        amount: parseFloat(payload.tokenSupply),
        price:  payload.tokenCost,
        uri: payload.file
    })
}
export const getTokens = () => api.get(`/tokens`)
export const getTokenById = id => api.get(`/token/${id}`)

const MongoDBInterface = {
    addToken,
    getTokens,
    getTokenById,
}

export default MongoDBInterface