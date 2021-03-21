import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardColumns } from 'react-bootstrap'
// import { RiDeleteBinLine } from 'react-icons/ri'
import secureAxios from '../../../secureAxios'
// import ShowMoreText from 'react-show-more-text'
import  BlogRender from './BlogRender'

class ViewBlogs extends Component {

    componentDidMount() {
        //Push to login if user is not Logged in
        if (!localStorage.getItem('username')){
            this.props.history.push('/login')
        }
        else{
            console.log(localStorage.getItem('refresh'), "Token")
            secureAxios.get('/blog', {headers: {
                'Authorization': `Bearer ${localStorage.getItem("access")}`,
            }})
            .then(res => {
                this.props.allBlogs(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    handleDelete=(id, index)=>{
        secureAxios.delete(`/blog/${id}`)
            .then(res => {
                console.log(res.data)
                this.props.deleteBlog(index)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleEdit=(blog)=>{
        console.log(blog)
        this.props.editBlog({...blog, edit:true})
        this.props.history.push('/detailblog')
    }

    viewDetails =(blog)=>{
        this.props.viewBlog({...blog, edit:false})
        this.props.history.push('/detailblog')
    }

    render() {
        // console.log(this.props.blogs, this.props.bearerToken)

        return (
            <div>
                <CardColumns style={{ width: "90%", margin: "auto"}}>
                    {this.props.blogs.map((item, index) => {
                        return (
                            <div>
                                <BlogRender key={index} index={index} item={item} userDetails={this.props.userDetails} viewDetails={this.viewDetails} 
                                handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
                            </div>
                    )})
                    }
                </CardColumns>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        userDetails: state.userDetails,
        bearerToken: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        allBlogs: (val) => dispatch({type:'ALL_BLOGS',payload:val}),
        deleteBlog: (val)=>dispatch({type: "DELETE_BLOG", payload: val}),
        editBlog:(val)=>dispatch({type:'EDIT_BLOG', payload:val}),
        viewBlog: (val)=>{
            dispatch({type:'VIEW_BLOG', payload:val})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBlogs)