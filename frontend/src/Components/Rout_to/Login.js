import React from 'react'
import { connect } from 'react-redux'
import {useForm} from 'react-hook-form'
import { Alert, Button, Col, Container, Form, Row, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import secureAxios from '../../secureAxios'


function Login(props){
    const {register, errors, handleSubmit} = useForm()

    const handleAuth = (evt) => {
        const postData = JSON.stringify({ username: evt.username, password: evt.password })

        secureAxios.post('/api/token/', postData, {headers: {
            'Content-Type': 'application/json'}
          })
            .then(res=>{
                console.log(res.data, "Login page")
                props.saveToken(res.data)
                secureAxios.get(`/users/${evt.username}`)
                    .then(res=>{
                    console.log(res.data)
                    props.saveUser(res.data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    props.authSuccess({ username: evt.username, password: evt.password })
                //     localStorage.setItem('navTab', 'tasks')
                    props.history.push('/')
                })
            .catch(err=>{
                console.log(err)
            })
    }

    return(
        <div>
            <Container className='m-3'>
                <Jumbotron className="mx-auto" style={{width:"90%", backgroundColor:"#c3bfa2ba"}}>
                <Form onSubmit = {handleSubmit(handleAuth)}>
                    <Form.Group as={Row}>
                        <Form.Label column sm= {{ span: 1, offset: 2 }}>Username:</Form.Label>
                        <Col sm='6'>
                            <Form.Control className="m-auto" style={{width:"70%", backgroundColor:"#80ffff"}} type="text" name = "username" placeholder="Enter Username" 
                            ref={register({
                            required: {value : true, message : "UserName is required"}})}/>
                            {errors.name && (
                                <Alert variant="danger">{errors.name.message}</Alert>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm= {{ span: 1, offset: 2 }}>Password:</Form.Label>
                        <Col sm='6'>
                            <Form.Control className="m-auto" style={{width:"70%", backgroundColor:"#80ffff"}} type="password" name = "password" placeholder="Enter Password" 
                            ref={register({
                            required: {value : true, message : "Password is required"}})}/>
                            {errors.password && (
                                <Alert variant="danger">{errors.password.message}</Alert>
                            )}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm= {{ span: 4, offset: 4 }}>
                            <Button type="submit" variant="outline-primary">Sign in</Button>
                        </Col>
                    </Form.Group>
                    <br />
                    <p style={{textAlign:"center"}}>Don't Have an account?? <Link to='/signup'>Cilck Here</Link> to Create account</p>
                </Form>
                </Jumbotron>
            </Container>
        </div>
    )
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        authSuccess: (val) => {
            dispatch({type: "AUTH_SUCCESS", payload: val})
        },
        saveUser: (val) => {
            dispatch({type: "USER_LOGGEDIN", payload: val})
        },
        saveToken:(val)=>{
            dispatch({type: "SAVE_TOKEN", payload: val})
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);