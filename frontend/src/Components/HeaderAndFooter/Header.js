import React, {Component} from 'react'
import { Container, Nav, Navbar, NavbarBrand, NavDropdown, NavItem, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {FaUserAlt, FaUserCircle} from 'react-icons/fa'
import {CgUser, CgProfile} from 'react-icons/cg'
import {GoMail} from 'react-icons/go'
import {IoCreateSharp} from 'react-icons/io5'
import {HiOutlineViewList} from 'react-icons/hi'
import { AiOutlineLogin, AiOutlineLogout, AiOutlineUserAdd, AiOutlineHome } from "react-icons/ai";
import secureAxios from '../../secureAxios'

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            navItems : 'home'
        }
    }

    componentDidMount(){
        const username = localStorage.getItem('username')
        if (username != null){
            secureAxios.get(`/users/${username}`)
                .then(res=>{
                    this.props.saveUser(res.data)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        
        else{
            this.props.clearUser()
        }
    }

    handlenav = (navitem) =>{
        console.log(navitem, "nav clicked")
        this.setState({navItems:navitem})
    }

    styleRight={
        position:"absolute",
        right:"0"
    }

    render(){
        // console.log("Header file", this.props.userDetails)
        return(
            <div>
                <Container className="my-2">
                    <header>
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                            <NavbarBrand>BLOGGER</NavbarBrand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">  
                                <Nav className="ml-5 mr-auto">
                                    <NavItem  className="mx-2 my-auto"><Link to ="/" style={{color:"#19e6e6", fontSize:"17px"}}><AiOutlineHome/> Home</Link></NavItem>
                                    
                                    {this.props.userDetails.username == null ?
                                        <>
                                            <NavItem bg='light' className="mx-2 my-auto"><Link to="/login" bg='light' className="mx-2 my-auto" style={{color:"#66ff33", fontSize:"17px"}}><AiOutlineLogin/> Login</Link></NavItem>
                                            <NavItem bg='light' className="mx-2 my-auto"><Link to="/signup" bg='light' className="mx-2 my-auto" style={{color:"#66ff33", fontSize:"17px"}}><AiOutlineUserAdd/> Signup</Link></NavItem>  
                                        </>
                                        :
                                        <>
                                            <NavItem className="mx-2 my-auto" ><Link to='/createblog' style={{color:"#2bff51", fontSize:"17px"}}><IoCreateSharp/> Create Blog</Link></NavItem>
                                            <NavItem className="mx-2 my-auto" ><Link to='/viewblogs' style={{color:"#2bff51", fontSize:"17px"}}><HiOutlineViewList/> View Blogs</Link></NavItem>
                                            <NavItem className="mx-2 my-auto" ><Link to='/myblogs' style={{color:"#2bff51", fontSize:"17px"}}><FaUserCircle/> My Blogs</Link></NavItem>
                                        </>
                                    }
                                </Nav>

                                <Nav className="ml-5 mr-auto">
                                    {this.props.userDetails.username != null &&
                                        <>
                                            <Row style={{color:"#2bff51", fontSize:"17px"}}>
                                                <FaUserAlt className="ml-4 my-auto"/>
                                                <NavDropdown className="mx-2 my-auto" style={{color:"green", fontSize:"17px"}} title= {`Hello ${this.props.userDetails.first_name}`}>
                                                    <NavDropdown.Item><CgUser/> <strong>{this.props.userDetails.first_name} {this.props.userDetails.last_name}</strong>  </NavDropdown.Item>
                                                    <NavDropdown.Item><CgProfile/><strong>{this.props.userDetails.username}</strong></NavDropdown.Item>
                                                    <NavDropdown.Item><GoMail/>  <strong>{this.props.userDetails.email}</strong></NavDropdown.Item>
                                                </NavDropdown>
                                            </Row>
                                            <NavItem className="mx-2 my-auto"><Link to='/logout' style={{color:"red", fontSize:"17px"}}><AiOutlineLogout/></Link></NavItem>
                                        </>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </header>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        authdetails : state.authdetails.username != null ? state.authdetails : false,
        userDetails: state.userDetails.username != null ? state.userDetails : false,
        bearerToken: state.token
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return{
        logout : (val) => {
            dispatch({type:"LOGOUT", payload:val})
        },
        clearUser: (val) => {
            dispatch({type: "USER_LOGGEDOUT"})
        },
        saveUser: (val) => {
            dispatch({type: "USER_LOGGEDIN", payload: val})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)