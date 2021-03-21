import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import secureAxios from '../../secureAxios'

class Logout extends Component{
    
    componentDidMount(){
        secureAxios.get("/logout")
            .then(res=> {
                console.log(res.data, "Logout componentDidMount")
                this.props.clearUser()
                this.props.logout()
            })
            .catch(err=>console.log(err))
    }
    
    render(){
        return(
            <>
                <Redirect to="/"/>
            </>
        )
    }
}

const mapDispatchToProps=(dispatch, props)=>{
    return{
        logout:(val)=>dispatch({type:"LOGOUT"}),
        clearUser: (val) => dispatch({type: "USER_LOGGEDOUT"})
    }
}

export default connect(null, mapDispatchToProps)(Logout)