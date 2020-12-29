import React from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './style.css';
import LayoutTwo from '../LayoutTwo/LayoutTwo';

export default class Entry extends React.Component{

    state= {
        order: []
    }
     
    componentDidMount()
    {   
        axios
        .get("https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/OrderHeaders/2/10-1-2020/12-30-2020")
        .then(function(response) {
            this.setState({order: response.data[0]});            
        }.bind(this))  // <-- notice the .bind(this)
        .catch(function(error) {
            console.log(error);
        });
        
    }
     
    render(){
        return(
                <LayoutTwo>
                    <Container className="container-bottom">
                    <h2>Order entry</h2>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                            Order N°.
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="number" defaultValue={this.state.order.orderNo} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                            Delivery date
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="text" defaultValue={this.state.order.orderDate} />
                            </Col>
                        </Form.Group>
                        <hr></hr>
                        <Form.Group>
                            <Form.Label>Item N°. / UPC</Form.Label>
                            <Form.Control as="select" size="sm" custom>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Order quantity</Form.Label>
                            <br></br>
                            <Form.Label>Cases</Form.Label>
                            <Form.Control type="text" placeholder="cases" />
                        </Form.Group>
                        <Button className="b2">Add Item to Order</Button>
                        <hr></hr>
                    </Form>
                    <button className="buttom2">Item List on Order</button>
                    <Form>
                        <Row>
                            <Col>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control placeholder="Brand" />
                            </Col>
                            <Col>
                            <Form.Label>Pack</Form.Label>
                            <Form.Control placeholder="Pack" />
                            </Col>  
                            <Col>
                            <Form.Label>Size</Form.Label>
                            <Form.Control placeholder="Size" />
                            </Col>
                            <Col>
                            <Form.Label>UOM</Form.Label>
                            <Form.Control placeholder="UOM" />
                            </Col>  
                        </Row>
                    </Form>
                    <Form.Group>
                        <Form.Label>Descrption</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Form className="form4"> 
                        <Row>
                            <Col>
                            <Form.Label>Case $</Form.Label>
                            <Form.Control placeholder="Case" />
                            </Col>
                            <Col>
                            <Form.Label>Unit $</Form.Label>
                            <Form.Control placeholder="Unit" />
                            </Col>  
                            <Col>
                            <Form.Label>Deal $</Form.Label>
                            <Form.Control placeholder="Deal" />
                            </Col>
                        </Row>
                    </Form>
                    <Form.Group className="buttoms">
                        <Button>Suspend Order</Button>
                        <Button className="red">Close Order</Button>
                    </Form.Group>
                    </Container>
                </LayoutTwo>
        )
    }
}