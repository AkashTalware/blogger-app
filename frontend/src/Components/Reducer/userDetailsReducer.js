export default function userDetailsReducer(state = {}, action){
    switch (action.type){

        case "USER_LOGGEDIN":{

            console.log("inside user details reducer", action.payload)
            localStorage.setItem("userid", action.payload.id)
            console.log(localStorage.getItem("userid"))
            return action.payload
        }

        case "USER_LOGGEDOUT":{
            // console.log("Inside UserDetails !! USER IS BEING Logged Out!!")
            // console.log(localStorage.getItem("username"), "Localstorage before clearing")
            localStorage.clear()
            // console.log(localStorage.getItem("username"), "Localstorage")
            return {username:null}
        }

        default:{
            return state
        }
    }
}