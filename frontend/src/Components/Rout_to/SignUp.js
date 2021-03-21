import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { Col, Form, Button, Row, Container, Alert, Jumbotron } from 'react-bootstrap'
import secureAxios from '../../secureAxios'

function SignUp(props){

    const {register, errors, handleSubmit} = useForm()

    const handleSignUp = (evt) => {
        const signUpData = {
            first_name : evt.first_name,
            last_name : evt.last_name,
            email : evt.email,
            username : evt.username,
            password : evt.password1,
        }

        secureAxios.post('/create-user/', JSON.stringify(signUpData), {headers: {
            'Content-Type': 'application/json'}
          }).then(res=>{
              console.log(res.data)
              props.history.push('/login')
          }).catch(err=>console.log(err))
    }



    return(
        <div>
            <Jumbotron className="mx-auto" style={{width:"90%", backgroundColor:"#3b4046ba"}}>
            <Container className='m-2 mx-auto' style={{ width:"90%", color:"#a1c3e6", fontSize:"20px" }}>
                <Form onSubmit={handleSubmit(handleSignUp)}>
                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm="4">Enter Your First Name: </Form.Label>
                        <Col sm='8'>
                            <Form.Control type="text" name = "first_name" placeholder="First Name" 
                            style={{backgroundColor:"#88e4f3"}}
                            ref={register({required: {value: true, message : "First Name is required"}})}
                            />
                            {errors.name && (
                                <Alert variant="danger">{errors.name.message}</Alert>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm="4">Enter Your Last Name: </Form.Label>
                        <Col sm='8'>
                            <Form.Control type="text" name = "last_name" placeholder="Last Name" 
                            style={{backgroundColor:"#88e4f3"}}
                            ref={register({required: {value: true, message : "Last Name is required"}})}
                            />
                            {errors.name && (
                                <Alert variant="danger">{errors.name.message}</Alert>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm="4">Enter Email ID:</Form.Label>
                        <Col sm='8'>
                            <Form.Control type="email" name = "email" placeholder="Enter Email" 
                            style={{backgroundColor:"#88e4f3"}}
                            ref={register({ required: {value : true, message : "Email is required"}})} />
                            {errors.email && (
                                <Alert variant="danger">{errors.email.message}</Alert>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm="4">Create Username:</Form.Label>
                        <Col sm='8'>
                            <Form.Control type="text" name = "username" placeholder="Type your username"
                            style={{backgroundColor:"#88e4f3"}}
                            ref={register({required: {value : true, message : "Please enter username"}})} />
                            {errors.name && (
                                <Alert variant="danger">{errors.name.message}</Alert>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm="4">Create Password:</Form.Label>
                        <Col sm='8'>
                            <Form.Control name="password1" type='password' placeholder="Create Password"
                            style={{backgroundColor:"#88e4f3"}}
                                ref={register({ 
                                    required:{value:true, message:'Please Enter The password'}})} />
                            {errors.password && (
                                <Alert variant="danger">{errors.password.message}</Alert>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm="4">Repeat Password:</Form.Label>
                        <Col sm='8'>
                            <Form.Control name="password2" type='password' placeholder="Repeat Password"
                            style={{backgroundColor:"#88e4f3"}}
                                ref={register({ 
                                    required:{value:true, message:'Please Enter The password'}})} />
                            {errors.password && (
                                <Alert variant="danger">{errors.password.message}</Alert>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 4, offset: 4 }}>
                            <Button type="submit" variant="outline-primary">Sign Up</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
            </Jumbotron>
        </div>
    )
}

const mapDispatchToProps = (dispatch, props) => {
    return{
        authSuccess: (val) => {dispatch({type:"AUTH_SUCCESS", payload:val})},

        signMeUp: (val) => {dispatch({type:"SIGN_ME_UP", payload:val})}
    }
}

export default connect(null, mapDispatchToProps)(SignUp)