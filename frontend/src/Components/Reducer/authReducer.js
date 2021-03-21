
export default function authReducer(state = {}, action){
    switch (action.type) {

        case "AUTH_SUCCESS":{
            console.log(action.payload)
            localStorage.setItem("username", action.payload.username)
            // localStorage.setItem("password", action.payload.password)
            console.log(action.payload)
            return action.payload
        }

        case "LOGOUT":{
            localStorage.clear()
            // console.log("localstorage cleared, {username:null, password:null}")
            return {username:null, password:null}
        }

        case "PAGE_LOADED":{
            const onLoad = {username:null, password:null}
            onLoad.username = localStorage.getItem('username')? localStorage.getItem('username'):null
            // onLoad.password = localStorage.getItem('password')? localStorage.getItem('password'):null
            return onLoad
        }

        default:{
            return state
        }
    }
}