import React from 'react'
import { Container, Form, Row, Col } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'

export default class Inquiry extends React.Component{
     
    render(){
        return(
                <LayoutTwo className="border uplay">
                    <Container className="container-bottom">
                    <h2>Item Inquiry</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label>Store</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Item N°. / UPC</Form.Label>
                            <Form.Control as="select" size="sm" custom>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <hr></hr>
                        <Form.Group>
                            <Form.Label>Item No°</Form.Label>
                            <Form.Control type="text" disabled placeholder="item N°" />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Row>
                            <Col>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control disabled placeholder="Brand" />
                            </Col>
                            <Col>
                            <Form.Label>Pack</Form.Label>
                            <Form.Control disabled placeholder="Pack" />
                            </Col>  
                            <Col>
                            <Form.Label>Size</Form.Label>
                            <Form.Control disabled placeholder="Size" />
                            </Col>
                            <Col>
                            <Form.Label>UOM</Form.Label>
                            <Form.Control disabled placeholder="UOM" />
                            </Col>  
                        </Row>
                    </Form>
                    <Form.Group>
                        <Form.Label>Descrption</Form.Label>
                        <Form.Control as="textarea" rows={1} disabled />
                    </Form.Group>
                    <Form className="form4"> 
                        <Row>
                            <Col>
                            <Form.Label>Case $</Form.Label>
                            <Form.Control disabled placeholder="Case" />
                            </Col>
                            <Col>
                            <Form.Label>Unit $</Form.Label>
                            <Form.Control disabled placeholder="Unit" />
                            </Col>  
                            <Col>
                            <Form.Label>Deal $</Form.Label>
                            <Form.Control disabled placeholder="Deal" />
                            </Col>
                        </Row>
                    </Form>
                    <Form.Group>
                        <Form.Label>UPC</Form.Label>
                        <Form.Control type="text" disabled placeholder="UPC" />
                    </Form.Group>
                    </Container>
                </LayoutTwo>
        )
    }
}