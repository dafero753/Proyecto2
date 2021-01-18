import React from 'react'
import { Button, Container } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'

export default class Report extends React.Component{
    
    handleClick = e => {
        window.location.href="/sent-orders";
    }
    handleClick1 = e => {
        window.location.href="/price-orders";
    }

    render(){
        return(
                <LayoutTwo className="border uplay">
                    <Container className="container-bottom">
                    <h2>Order entry System</h2>
                    <hr></hr>

                    <h3><strong>Reports</strong></h3>
                    <Button 
                    variant="primary" 
                    type="submit" 
                    className="buttom-exit"
                    onClick={this.handleClick}
                    >
                        Sent Orders
                    </Button>
                    <Button 
                    variant="primary" 
                    type="submit" 
                    className="buttom-exit"
                    onClick={this.handleClick1}
                    >
                        Items With Price Change
                    </Button>
                    </Container>
                </LayoutTwo>

        )
    }
}