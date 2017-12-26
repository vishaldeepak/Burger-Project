import axios from 'axios'

const instance =  axios.create({
  baseURL: 'https://react-udemy-vishal.firebaseio.com/'
})

export default instance;