import {combineReducers} from 'redux'
import authReducer from './authReducer'
import blogReducer from './blogsReducer'
import tokenReducer from './tokenReducer'
import userDetailsReducer from './userDetailsReducer'
import detailBlogReducer from './detailBlogReducer'

export default combineReducers({
    blogs: blogReducer,
    authdetails: authReducer,
    token: tokenReducer,
    userDetails: userDetailsReducer,
    detailBlog: detailBlogReducer
})
