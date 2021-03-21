import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardColumns } from 'react-bootstrap'
// import { RiDeleteBinLine } from 'react-icons/ri'
import secureAxios from '../../../secureAxios'
// import ShowMoreText from 'react-show-more-text'
import  BlogRender from './BlogRender'

class MyBlogs extends Component {
    constructor(props){
        super(props)
        this.state = {
            myBlogs:[]
        }
    }

    componentDidMount() {
        //Push to login if user is not Logged in
        console.log(this.props.userDetails)
        if (!localStorage.getItem('username')){
            this.props.history.push('/login')
        }
        
        else{
            // console.log(localStorage.getItem('userid'), "Token")
            
            secureAxios.get(`/user_blogs/${localStorage.getItem("userid")}`, {headers: {
                'Authorization': `Bearer ${localStorage.getItem("access")}`,
            }})
            .then(res => {
                // console.log(res.data)
                // this.setState({myBlogs:res.data})
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
                // this.setState({myBlogs:[...this.state.myBlogs.slice(0, index), ...this.state.myBlogs.slice(index+1)]})
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
                <CardColumns style={{ width: "90%", margin: "auto"}} className="my-auto">
                {this.props.blogs.map((item, index) => {
                    return (
                        <BlogRender key={index} index={index} item={item} userDetails={this.props.userDetails} viewDetails={this.viewDetails} 
                            handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
                )})
                }
                </CardColumns>
            </div>
        )
    }
}
// style={{ width: "70%", margin: "auto"}}

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

export default connect(mapStateToProps, mapDispatchToProps)(MyBlogs)