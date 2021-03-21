import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container,Jumbotron } from 'react-bootstrap'

class Home extends Component{
    styles = {
        backgroundColor:"#c3bfa2ba", 
        textAlign:"center", 
        width:"70%"
    }
    render(){
        console.log(this.props)
        return(
            <div>
                {this.props.userDetails ==null ? 
                <div>
                    <Container>
                        <Jumbotron fluid bg="dark" style={this.styles} className="mt-4 mx-auto">
                            <h1>Hello user!!</h1>
                            <p> <Link to='/login'>Click here</Link> to go to the login page</p><br/>
                            <p>Don't have an account? <Link to='/signup'>Click here</Link> to create Your account</p>
                        </Jumbotron>
                    </Container>
                </div> :
                <div>
                    <Container>
                        <Jumbotron fluid bg="dark" style={this.styles} className="mt-4 mx-auto">
                            <h1>Hello {this.props.userDetails.username}!!</h1>
                            <p> <Link to = "/viewblogs" >Click Here</Link> to Get to blogs.</p>
                        </Jumbotron>
                    </Container>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps= state => {
    return{
        authdetails: state.authdetails.username != null ? state.authdetails : null,
        userDetails: state.userDetails.username != null ? state.userDetails : null
    }
}

const mapDispatchToProps= (dispatch, props) =>{
    return{
        saveUser: (val) => {
            dispatch({type: "USER_LOGGEDIN", payload: val})
        },
        
        clearUser: () => dispatch({type: "USER_LOGGEDOUT"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)