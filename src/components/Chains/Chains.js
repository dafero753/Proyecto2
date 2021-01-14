import React from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'

export default class Chains extends React.Component{
     
    render(){
        return(
            <LayoutTwo className="border uplay">
                <Container className="container-bottom">
                <h2>Chains Maintenance</h2>
                    <Form>
                        <Button className="b3">New Chain</Button>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Control as="select" defaultValue="Chain List">
                                <option>Chain 1</option>
                                <option>Chain 2</option>
                                <option>Chain 3</option>
                                <option>Chain 4</option>
                                <option>Chain 5</option>
                            </Form.Control>
                            <hr></hr>
                            <Form>
                            <Row>
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
                        <Button className="b3">Save</Button>
                    </Form>
                </Container>
            </LayoutTwo>
        )
    }
}