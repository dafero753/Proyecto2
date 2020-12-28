import React from 'react';
import { Button, Container, Form, Col, Table } from 'react-bootstrap';
import './style.css';
import LayoutTwo from '../LayoutTwo/LayoutTwo';

//poner stores

export default class Sent extends React.Component{
    
    handleClick = e => {
        window.location.href="/detail-orders";
    }

    render(){
        return(
                <LayoutTwo className="border uplay">
                    <Container className="container-bottom">
                    <h2>Sent Orders</h2>
                    <Form.Group>
                        <Form.Label>Store</Form.Label>
                        <Form.Control as="select">
                            <option>1</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Start</Form.Label>
                        <Form.Control type="date"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>End</Form.Label>
                        <Form.Control type="date"/>
                        </Form.Group>

                        <Button className="buttomDate">GO</Button>

                        <hr></hr>
                    </Form.Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>Order N°.</th>
                            <th>Order Date</th>
                            <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1242</td>
                            <td>10/25/2020</td>
                            <td>
                                <button 
                                className="button1"
                                onClick={this.handleClick}
                                >{'>'}</button>
                            </td>
                            </tr>
                            <tr>
                            <td>1243</td>
                            <td>10/27/2020</td>
                            <td>
                                <button 
                                className="button1"
                                onClick={this.handleClick}
                                >{'>'}</button>
                            </td>
                            </tr>
                            <tr>
                            <td>1244</td>
                            <td>11/29/2020</td>
                            <td>
                                <button 
                                className="button1"
                                onClick={this.handleClick}
                                >{'>'}</button>
                            </td>
                            </tr>
                            <tr>
                            <td>1245</td>
                            <td>11/05/2020</td>
                            <td>
                                <button 
                                className="button1"
                                onClick={this.handleClick}
                                >{'>'}</button>
                            </td>
                            </tr>
                            <tr>
                            <td>1246</td>
                            <td>11/09/2020</td>
                            <td>
                                <button 
                                className="button1"
                                onClick={this.handleClick}
                                >{'>'}</button>
                            </td>
                            </tr>
                            <tr>
                            <td>1247</td>
                            <td>11/18/2020</td>
                            <td>
                                <button 
                                className="button1"
                                onClick={this.handleClick}
                                >{'>'}</button>
                            </td>
                            </tr>
                            <tr>
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