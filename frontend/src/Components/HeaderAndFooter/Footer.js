import React from 'react'
import {connect} from 'react-redux'
import {SiFacebook, SiInstagram, SiTwitter, SiYoutube} from 'react-icons/si'
import {Row, ButtonGroup, Button} from 'react-bootstrap'



class Footer extends React.Component{

    styleButton={
        border:"5px"
    }

    render(){
        return(
            <div>
                <footer className="m-auto" style={{padding:"5px", backgroundColor:"#343a404d", textAlign:"center"}}>
                    <h4>Follow Us on</h4>
                    <Row>
                        <ButtonGroup className="m-auto">
                            <Button variant="outline-dark" style={this.styleButton}><SiFacebook/></Button>
                            <Button variant="outline-dark" style={this.styleButton}><SiInstagram/></Button>
                            <Button variant="outline-dark" style={this.styleButton}><SiTwitter/></Button>
                            <Button variant="outline-dark" style={this.styleButton}><SiYoutube/></Button>
                        </ButtonGroup>
                    </Row>
                </footer>
            </div>
        )
    }
}

export default connect()(Footer)