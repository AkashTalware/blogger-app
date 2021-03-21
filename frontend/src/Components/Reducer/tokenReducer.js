export default function tokenReducer(state = {}, action){
    switch (action.type){

        case "SAVE_TOKEN":{
            localStorage.setItem('access', action.payload.access)
            localStorage.setItem('refresh', action.payload.refresh)
            return action.payload
        }

        case "REFRESH_TOKEN":{
            console.log(action.payload)
            localStorage.setItem('access', action.payload.access)
            return {...state, access:action.payload.access}
        }

        case "CLEAR_TOKEN":{
            return ""
        }

        default:{
            return state
        }
    }
}