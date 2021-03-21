import axios from 'axios'

const secureAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000'
})

secureAxios.interceptors.response.use(response => {
    console.log("The Link Works")
    return response
}, error => {
    console.log("An Error has occured", error)
    if (error.response.status === 401){
        console.log(error.response, "Error Response")
        console.log("Refreshing Token!!")
        
        if(error.response.data.code === "token_not_valid"){
            // alert(error.response.data.detail, "Refreshing token DW")
            console.log(window.location.href)
            localStorage.setItem('prev_location', window.location.href)
            window.location.href = '/refreshtoken'
        }
        else{
            alert(error.response.data.detail)
        }
    }
    
    else if (error.response.status === 409){
        console.log(error)
        console.log(error.response)
        alert(error.response.data)
    }
    return Promise.reject(console.error)
})

export default secureAxios