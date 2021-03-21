import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import secureAxios from '../../secureAxios'

class RefreshToken extends Component{
    
    componentDidMount(){
        console.log(this.props, "")
        if(localStorage.getItem('refresh')){
            const refreshToken = {refresh : localStorage.getItem('refresh')}
            secureAxios.post('/api/token/refresh/', JSON.stringify(refreshToken), {headers: {
                'Content-Type': 'application/json'}
              })
            .then(res=>{
                console.log(res.data, "Refreshed Access Token")
                this.props.refreshToken(res.data)
                // this.props.history.push(localStorage.getItem("prev_location"))
                const location = localStorage.getItem("prev_location")
                window.location.href = location
            })
            .catch(err=>{console.log(err)})
        }
    }
    
    render(){
        return(
            <>
                {/* <Redirect go={-1}/> */}
            </>
        )
    }
}

const mapDispatchToProps=(dispatch, props)=>{
    return{
        refreshToken: (val)=>{
            dispatch({type:"REFRESH_TOKEN", payload:val})
        }
    }
}

export default connect(null, mapDispatchToProps)(RefreshToken)