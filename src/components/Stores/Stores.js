import React from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'

export default class Stores extends React.Component{
     
    render(){
        return(
                <LayoutTwo className="border uplay">
                    <Container className="container-bottom">
                    <h2>Stores Maintenance</h2>
                        <Form>
                            <Button className="b3">New Store</Button>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Control as="select" defaultValue="Store List">
                                    <option>Store 1</option>
                                    <option>Store 2</option>
                                    <option>Store 3</option>
                                    <option>Store 4</option>
                                    <option>Store 5</option>
                                </Form.Control>
                                <hr></hr>
                                <Form.Label>Chain</Form.Label>
                                <Form.Control as="select" defaultValue="Chain List">
                                    <option>Chain 1</option>
                                    <option>Chain 2</option>
                                    <option>Chain 3</option>
                                    <option>Chain 4</option>
                                    <option>Chain 5</option>
                                </Form.Control>
                                <Form className="form4">
                                    <Row>
                                    <Form.Label as="legend" column sm={4}>
                                    <p>Store Type</p>
                                    </Form.Label>
                                    <Col xs={9}>
                                    <Form.Check type="radio" name="storeType" inline label="Single" />
                                    <Form.Check type="radio" name="storeType" inline label="Chain" />
                                    <Form.Check type="radio" name="storeType" inline label="Distributor" />
                                    </Col>
                                    <Col>
                                    <Form.Label>Active</Form.Label>
                                    <Form>
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                        />
                                    </Form>
                                    </Col>  
                                </Row>
                            </Form>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Address" />
                            </Form.Group>
                            <Form.Group>
                            <Form.Label>Phone</Form.Label>
                                <Form.Control type="number" placeholder="Phone" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="mail" placeholder="Email" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contact</Form.Label>
                                <Form.Control type="text" placeholder="Contact" />
                            </Form.Group>
                            <Form className="form4">
                                    <Row>
                                    <Col>
                                    <Form.Label>
                                    Price Level
                                    </Form.Label>
                                    <Col>
                                    <Form.Control type="number" placeholder="Price Level" />
                                    </Col>
                                    </Col>  
                                    <Col>
                                    <Form.Label>
                                    Store Code
                                    </Form.Label>
                                    <Col>
                                    <Form.Control type="number" placeholder="Store Code" />
                                    </Col>
                                    </Col> 
                                </Row>
                            </Form>
                            <Button className="b3">Save</Button>
                        </Form>
                    </Container>
                </LayoutTwo>

        )
    }
}