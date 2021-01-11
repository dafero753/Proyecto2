import React from 'react'
import Layout from '../Layout'
import { Button, Container} from 'react-bootstrap'
import './style.css'
import Menu from '../Menu';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Order extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            loggedIn: {
                roleId: `${cookies.get('roleId')}`,
            },
        }; 
      }   

    handleClick = e => {
        window.location.href="/work-with-orders";
    }
    handleClick2 = e => {
        window.location.href="/inquiry-orders";
    }
    handleClick3 = e => {
        window.location.href="/report-orders";
    }
    handleClick4 = e => {
        window.location.href="/";
    }

    render(){

        const show = this.state.loggedIn.roleId

        return(
            <Layout>
                <div className="menu"><Menu role = {show}></Menu> </div> 
                <Container className="container-bottom">
                <h2>Order Entry System</h2>

                { show == 10 || show == 1 || show == 2? 
                    <Button 
                    variant="primary" 
                    type="submit" 
                    className="buttom-entry"
                    onClick={this.handleClick}
                    >
                        ORDER ENTRY
                    </Button> : <div></div>
                }
                
                <Button 
                variant="primary" 
                type="submit" 
                className="buttom-item"
                onClick={this.handleClick2}
                >
                    ITEM INQUIRY
                </Button>
                
                <Button 
                variant="primary" 
                type="submit" 
                className="buttom-reports"
                onClick={this.handleClick3}
                >
                    REPORTS
                </Button>

                <Button 
                variant="primary" 
                type="submit" 
                className="buttom-exit"
                onClick={this.handleClick4}>
                    EXIT
                </Button>
                
                </Container>
            </Layout>

        )
    }
}