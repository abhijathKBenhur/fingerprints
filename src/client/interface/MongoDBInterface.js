import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const addToken = payload => {
    return api.post(`/token`,{
        account: "this.account",
        name: payload.name,
        category: payload.category,
        description: payload.description,
        amount: parseFloat(payload.amount),
        price:  payload.price,
        uri: payload.uri
    })
}
export const getTokens = () =>  { 
    return api.get(`/tokens`) 
}
export const getTokenById = id => { 
    return api.get(`/token/${id}`) 
}

export const getFilePath = file => { 
    let formData = new FormData();
    formData.append('fileData',file )
    return axios({
        method: 'post',
        url: 'http://localhost:4000/api/getFilePath',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
          }
      });
}

const MongoDBInterface = {
    addToken,
    getTokens,
    getTokenById,
    getFilePath
}

export default MongoDBInterface