import React, {Component} from 'react'

export default class ErrorBoundary extends Component{
    constructor(props){
        super(props)
        this.state={
            hasError:false
        }
    }

    static getDerivedStateFromError(error){
        console.log("getDerivedStateFromError")
        this.setState({hasError:true})
    }

    componentDidCatch(error, info){
        console.log("Error Happened!! componentDidCatch")
        this.setState({hasError:true})
        // logErrorToMyService(error, info);
    }

    render(){
        if (this.state.hasError){
            return <h1>Shit Went Wrong here!!</h1>
        }

        return this.props.children
    }
}