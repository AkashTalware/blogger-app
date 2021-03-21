import React, { Component } from 'react'
import { connect } from 'react-redux'
import secureAxios from '../../../secureAxios'
import { Form, Button, Container, InputGroup, Alert, Toast } from 'react-bootstrap'
import TextareaAutosize from 'react-textarea-autosize'

class CreateBlog extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:"",
            body:"",
            image:"",
            showAlert:false,
            doneCreating:false
        }

        this.ref = React.createRef()
    }

    componentDidMount(){
        if (!localStorage.getItem('username')){
            this.props.history.push('/login')
        }
        else{
            console.log(this.state, this.props.authdetails,'componentDidMount')
        }
    }

    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleImageChange = (evt) =>{
        this.setState({image:evt.target.files[0], showAlert:false})
    }

    addThisBlog=(evt)=>{
        console.log(this.state)
        if(this.state.image){
            let postForm = new FormData()
            postForm.append("title", this.state.title)
            postForm.append("body", this.state.body)
            postForm.append("image", this.state.image, this.state.image.name)
            postForm.append("author", this.props.userDetails.id)
            console.log(postForm)
    
            secureAxios.post('/blog/', postForm, {headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem("access")}`,
            }
            }).then(res=>{
                console.log(res.data)
                // this.props.history.push('/createblog')
                this.setState({ title:"", body:"", image:null, doneCreating:true})
                this.ref.current.value = null

            }).catch(err=>{
                console.log(err)
            })
        }
        else{
            // console.log("No Image here!!")
            // alert("No Image Here!!")
            this.setState({showAlert:true})
            
        }
    }

    styles = {
        width:'70%',
        color:"#f8f9fa",
        backgroundColor:"#0000008a",
        // margin:"5px",
        // padding:"10px"
    }

    render(){
        const {title, body} = this.state
        return(
            <div>
                <Container className='m-4 mx-auto' style={this.styles}>
                    <span style={{padding:"10px"}}>
                        {this.state.showAlert?
                            <Alert variant="warning" onClose={()=>{this.setState({showAlert:false})}} dismissible>
                                <Alert.Heading>Please Add Image in the blog</Alert.Heading>
                                <p>
                                    Image is needed to be uploaded in the Blog !!
                                </p>
                            </Alert>
                            :<></>
                        }
                        <Form>
                            <Form.Group>
                                <Form.Label>Title of your blog</Form.Label>
                                <InputGroup>
                                    <Form.Control name="title" type="text" placeholder="Type your title here" 
                                        onChange={(event)=>{this.handleChange(event)}} value={title} autoFocus={true}/>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Body</Form.Label>
                                <InputGroup>
                                    <TextareaAutosize style={{width:'100%'}} name="body" as= "TextareaAutosize" minRows={3}
                                        maxRows={6} placeholder="Body" value={body}
                                        onChange={(event)=>{this.handleChange(event)}}/>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <InputGroup>
                                    <Form.Control name="image" type="file" ref={this.ref}
                                        onChange={(event)=>{this.handleImageChange(event)}}/>
                                </InputGroup>
                            </Form.Group>

                            <Button className='my-2' variant="outline-primary" onClick={()=>{this.addThisBlog()}}>Add Blog</Button>
                            
                            {this.state.doneCreating&&
                            <Toast style={{backgroundColor:"green", padding:"5px"}} onClose={() => this.setState({doneCreating:false})} delay={15000} autohide>
                                <Toast.Header>
                                    <strong className="mr-auto">Done!!</strong>
                                </Toast.Header>
                                <Toast.Body>Woohoo, your Blog was created successfully!</Toast.Body>
                            </Toast>
                            }
                        </Form>
                    </span>
                </Container>
            </div>
        )
    }
}

const mapStateToProps=(state,props)=>{
    return{
        authdetails: state.authdetails.name!=null ? state.authdetails:false,
        userDetails: state.userDetails.username != null ? state.userDetails : false,
        bearerToken: state.token,
    }
}

const mapDispatchToProps=(dispatch, props)=>{
    return{
        addBlog:(val)=>dispatch({type:'ADD_BLOG', payload:val}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateBlog)