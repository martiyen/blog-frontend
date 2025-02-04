import axios from 'axios'
const basicUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(basicUrl, credentials)
    return response.data
}

export default { login }