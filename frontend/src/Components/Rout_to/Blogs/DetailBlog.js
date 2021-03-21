import React, { Component } from 'react'
import { connect } from 'react-redux'
import secureAxios from '../../../secureAxios'
import { Form, Button, Container, InputGroup, Row, Col, Card } from 'react-bootstrap'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FaEdit } from "react-icons/fa";

class DetailBlog extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: null,
            title:"",
            body:"",
            image:null,
            imageChanged: false,
            date_published: null,
            author: null,
            authorDetails: {}
        }
        this.ref = React.createRef()
    }

    componentDidMount(){
        this.setState({
            title:this.props.detailBlog.title,
            body:this.props.detailBlog.body,
            id:this.props.detailBlog.id,
            image:this.props.detailBlog.image,
            date_published:this.props.detailBlog.date_published,
            author:this.props.detailBlog.author,
            authorDetails:{first_name:"Full Name of author Could not be found"}
        })

        if (!localStorage.getItem('username')){
            this.props.history.push('/login')
        }
        else{
            this.props.detailBlog.author && (
            secureAxios.get(`/user-id/${this.props.detailBlog.author}`)
            .then(res=>{
                console.log(res.data,"DetailBlog")
                this.setState({
                    authorDetails:res.data,
                })
            })
            .catch(err=>{
                console.log(err)
            }))
        }
    }

    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleImageChange = (evt) =>{
        this.setState({image:evt.target.files[0], imageChanged:true})
    }

    editThisBlog=(evt)=>{
        // console.log(this.state.image.name)

        const postData = JSON.stringify({
            ...this.props.detailBlog,
            title: this.state.title,
            body: this.state.body,
        })

        let postForm = new FormData()
        postForm.append("title", this.state.title)
        postForm.append("body", this.state.body)
        this.state.imageChanged && postForm.append("image", this.state.image, this.state.image.name)
        // console.log(postForm)

        secureAxios.put(`/blog/${this.props.detailBlog.id}/`, postForm, {headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("access")}`,
        }
        }).then(res=>{
            console.log(res.data)
            // this.props.history.push('/createblog')
            this.setState({ imageChanged:false })
            console.log(this.state, "Updation Successful!!")
            this.ref.current.value = null
            this.props.doneEditing(postData)
            // this.props.history.push('/viewblogs')
        }).catch(err=>{
            console.log(err)
        })
        
    }
    
    handleDelete=(id)=>{
        secureAxios.delete(`/blog/${id}`)
            .then(res => {
                console.log(res.data)
                let delIndex = -1
                this.props.blogs.find((item, index)=>{
                    if(item.id === id){
                        delIndex = index
                        return item
                    }
                    return true
                })
                console.log(delIndex, "delete index")
                this.props.deleteBlog(delIndex)
                this.props.history.push("/myblogs")
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleEdit=()=>{
        this.props.editBlog({...this.props.detailBlog, edit:true})
    }

    styleBody = {
        textAlign:"justify",
        fonsize: "20px",
        lineHeight:"2.0",
        width:"50%"
    }

    styleImage = {
        position:"relative",
        width: "90%",
    }

    render(){
        const {title, body,image, date_published, author, id} = this.state
        // console.log(this.props.editBlog, "this.props")
        // console.log(this.state, "this.state")
        return(
            <div>
                {this.props.detailBlog.edit? 
                    <Container className='m-5' style={{width:'90%'}}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Title of your blog</Form.Label>
                                <InputGroup>
                                    <Form.Control  name="title" type="text" placeholder="Type your title here" 
                                        onChange={(event)=>{this.handleChange(event)}} value={title} autoFocus={true}/>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Body</Form.Label>
                                <InputGroup>
                                    <Form.Control  name="body" as="textarea" placeholder="Body" value={body}
                                    onChange={(event)=>{this.handleChange(event)}}/>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <InputGroup>
                                    <Form.Control name="image" type="file" ref={this.ref}
                                        onChange={(event)=>{this.handleImageChange(event)}}/>
                                </InputGroup>
                                <img src={`http://127.0.0.1:8000${image}`} alt=""></img>
                            </Form.Group>

                            <Row>
                                <Col sm='3'><strong>Posted On</strong>:</Col>
                                <Col sm='9'>{new Date(date_published).toDateString()}</Col>
                            </Row>
                            <Button variant="outline-primary" onClick={()=>{this.editThisBlog()}}>Done</Button>
                        </Form>
                    </Container>
                    :
                    <Container>
                        <Card className="mx-5 my-3 " style={{backgroundColor:"black"}} text='white'>
                            <Card.Header as="h4">
                                <Row className="mx-3">
                                    {title}
                                </Row>
                                
                            </Card.Header>
                            <Row className="mx-2">
                                <Col sm='3'><small>Posted by</small>:</Col>
                                {this.state.authorDetails.first_name?
                                <Col sm='9'>
                                    <small>{this.state.authorDetails.first_name} {this.state.authorDetails.last_name} on {new Date(date_published).toDateString()}</small>
                                </Col>
                                :<small>Full name of author Could not be found!!</small>}
                            </Row>
                            <Card.Body>
                                <Card.Text className="m-auto">
                                    <img style={this.styleImage} src={`http://127.0.0.1:8000${image}`} alt=""></img>
                                    <Row>
                                        <Col style={this.styleBody}>{body}</Col>
                                    </Row>
                                    {this.props.userDetails.is_superuser || this.props.userDetails.id === author ? 
                                        <Row className='mt-3'>
                                            <Button className='mx-2' variant='outline-danger' onClick = {()=>this.handleDelete(id)}><RiDeleteBinLine className="mr-2 my-auto" /> Remove</Button>
                                            <Button className='mx-2' variant='outline-info' onClick = {()=>this.handleEdit()}><FaEdit className="mr-2 my-auto" /> Edit</Button>
                                        </Row>
                                        :
                                        <></>
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                }
            </div>
        )
    }
}

const mapStateToProps=(state,props)=>{
    return{
        authdetails: state.authdetails.name!=null ? state.authdetails:false,
        userDetails: state.userDetails.username != null ? state.userDetails : false,
        detailBlog : state.detailBlog.id != null ? state.detailBlog : false,
        bearerToken: state.token,
        blogs: state.blogs
    }
}

const mapDispatchToProps=(dispatch, props)=>{
    return{
        addBlog:(val)=>dispatch({type:'ADD_BLOG', payload:val}),
        doneEditing: ()=>dispatch({type:'DONE_EDITING'}),
        editBlog: (val)=>dispatch({type:'EDIT_BLOG', payload:val}),
        deleteBlog: (val)=>dispatch({type: "DELETE_BLOG", payload: val}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailBlog)

