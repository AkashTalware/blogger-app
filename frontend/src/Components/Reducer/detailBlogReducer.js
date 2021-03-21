export default function editBlogReducer(state = {}, action){
    switch (action.type){
        case "EDIT_BLOG":{
            console.log("Editing this blog", action.payload)
            return action.payload
        }

        case "DONE_EDITING":{
            console.log("Done Editing !!")
            const editedBlog = action.payload
            return {...state, ...editedBlog, edit : false}
        }

        case "VIEW_BLOG":{
            console.log(action.payload)
            return action.payload
        }

        default:{
            return state
        }
    }
}