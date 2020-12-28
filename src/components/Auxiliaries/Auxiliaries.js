import React from 'react'
import Layout from '../Layout'
import { Button, Container} from 'react-bootstrap'
import './style.css'

export default class Auxiliaries extends React.Component{
    
    handleClick = e => {
        window.location.href="/users";
    }
    handleClick1 = e => {
        window.location.href="/stores";
    }
    handleClick2 = e => {
        window.location.href="/chains";
    }
    handleClick3 = e => {
        window.location.href="/order-entry-system";
    }
    
    render(){
        return(
            <Layout className="border">
                <Container className="container-bottom">
                <h2>Auxiliaries Mantenance</h2>
                
                <hr></hr>

                <Button 
                 variant="primary" 
                 type="submit" 
                 className="buttom-entry"
                 onClick={this.handleClick}
                 >
                    Users
                </Button>
                
                <Button 
                 variant="primary" 
                 type="submit" 
                 className="buttom-entry"
                 onClick={this.handleClick1}
                 >
                    Stores
                </Button>
                
                <Button 
                 variant="primary" 
                 type="submit" 
                 className="buttom-entry"
                 onClick={this.handleClick2}
                 >
                    Chains
                </Button>

                <Button 
                 variant="primary" 
                 type="submit" 
                 className="buttom-exit"
                 onClick={this.handleClick3}
                 >
                    Exit
                </Button>
                
                </Container>
            </Layout>

        )
    }
}