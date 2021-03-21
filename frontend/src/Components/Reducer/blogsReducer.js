export default function blogsReducer(state = {}, action){
    switch (action.type){

        case "ALL_BLOGS":{
            return action.payload
        }

        case "ADD_BLOG":{
            return [...state, action.payload]
        }

        case 'EDIT_THIS_BLOG':{
            const{index, blog}=action.payload
            return[...state.slice(0,index), {...state[index], ...blog}, ...state.slice(index+1)]
        }
        
        case "DELETE_BLOG":{
            console.log("index", action.payload)
            return [...state.slice(0, action.payload), ...state.slice(action.payload+1)]
        }

        case 'LIKE_THIS_BLOG':{
            console.log("Liking the blog", action.payload, "Current Value", state[action.payload])
            return[...state.slice(0,action.payload), {...state[action.payload], blog_likes:state[action.payload].blog_likes+1 }, ...state.slice(action.payload+1)]
        }

        default:{
            return state
        }
    }
}