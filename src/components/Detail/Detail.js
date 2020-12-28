import React from 'react'
import { Container, Form, Row, Col, Table } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'

export default class Detail extends React.Component{
     
    render(){
        return(
                <LayoutTwo className="border uplay">
                    <Container className="container-bottom">
                    <h2>Order Detail</h2>
                    <Form >
                        <Row>
                            <Col>
                            <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                                Order No.
                            </Form.Label>
                            <Form.Control type="number" />
                            </Col>
                            <Col>
                            <Form.Label>Order By</Form.Label>
                            <Form.Control type="text" />
                            </Col>  
                        </Row>
                        <Row>
                            <Col>
                            <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                                Order Date
                            </Form.Label>
                            <Form.Control type="date" />
                            </Col>
                            <Col>
                            <Form.Label>Amount $</Form.Label>
                            <Form.Control type="number" />
                            </Col>  
                        </Row>
                        <Row>
                            <Col>
                            <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                                Total Cases
                            </Form.Label>
                            <Form.Control />
                            </Col>
                            <Col>
                            <Form.Label>Total Units</Form.Label>
                            <Form.Control type="number" />
                            </Col>  
                        </Row>
                        <hr></hr>
                    </Form>
                    <Table striped bordered hover size="sm" className="table1">
                        <thead>
                            <tr>
                                <th>Item N°.</th>
                                <th>Description</th>
                                <th>Size</th>
                                <th>Cases</th>
                                <th>Units</th>
                                <th>Unit $</th>
                                <th>Total $</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>71500270045</td>
                                <td>Oreo Cookie White</td>
                                <td>24</td>
                                <td>15</td>
                                <td>0</td>
                                <td>3.50</td>
                                <td>1,260.00</td>
                            </tr>
                            <tr>
                                <td>71500270358</td>
                                <td>Oreo Cookie Mint</td>
                                <td>12</td>
                                <td>30</td>
                                <td>5</td>
                                <td>3.89</td>
                                <td>1,419.85</td>
                            </tr>
                            <tr>
                                <td>71500276282</td>
                                <td>Oreo Cookie Origl</td>
                                <td>48</td>
                                <td>25</td>
                                <td>10</td>
                                <td>4.25</td>
                                <td>4,823.75</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>                            
                        </tbody>
                    </Table>
                    </Container>
                </LayoutTwo>
        )
    }
}