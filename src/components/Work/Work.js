import React from 'react';
import { Button, Container, Form, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import './style.css';
import LayoutTwo from '../LayoutTwo/LayoutTwo';
import Cookies from 'universal-cookie';

const baseUrl = "/OrderHeaders";
const cookies = new Cookies()

export default class Work extends React.Component{

    state={
        form:{
            companyId: '',
            deliveryDate: '',
            UserCodeCreation: '',
        }
    }
    
    handleChange = async e => {
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    CreateNewOrder = async(e) => {
        e.preventDefault();
        const create = JSON.stringify({
            companyId: `${this.state.form.companyId}`, 
            deliveryDate: `${this.state.form.deliveryDate}T00:00:00`,
            UserCodeCreation: `${this.state.form.UserCodeCreation}`
        })
        console.log(create)
        await axios.post(baseUrl, create, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then ( response => {
            console.log(response.data)
            return response.data;
        } )
        .then ( response => {
            if(response){
                var resp = response;
                cookies.set('companyId', resp.companyId, {path: "/"});
                cookies.set('orderNo', resp.orderNo, {path: "/"});
                cookies.set('orderDate', resp.orderDate, {path: "/"});
                cookies.set('orderStatus', resp.orderStatus, {path: "/"});
                cookies.set('deliveryDate', resp.deliveryDate, {path: "/"});
                cookies.set('userCodeCreation', resp.userCodeCreation, {path: "/"});
                cookies.set('lastModification', resp.lastModification, {path: "/"});
                cookies.set('userCodeModification', resp.userCodeModification, {path: "/"});
                cookies.set('company', resp.company, {path: "/"});
                cookies.set('userCodeCreationNavigation', resp.userCodeCreationNavigation, {path: "/"});
                cookies.set('userCodeModificationNavigation', resp.userCodeModificationNavigation, {path: "/"});
                console.log(response);
            }else {
                alert("user or password invalid");
            }
        })
        .catch ( error => {
            console.error('Error:', error);
        })
    }

    render(){
        return(
            <LayoutTwo>
                <Container className="container-bottom">
                <h2>Work with orders</h2>
                
                <Form onSubmit={(e)=>this.CreateNewOrder(e)}>
                    <Form.Group>
                        <Form.Label>Store</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter company id"
                        name="companyId" 
                        onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                        Delivery date
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control 
                        type="date" 
                        placeholder="date" 
                        name="deliveryDate"
                        onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>User Code</Form.Label>
                        <Form.Control 
                        type="text"
                        placeholder="User Code" 
                        name="UserCodeCreation"
                        onChange={this.handleChange} />
                    </Form.Group>
                    <Button type="submit">Create New Order</Button>
                    <hr></hr>
                </Form>
                
                <h3>Open Orders</h3>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Order N°.</th>
                        <th>Delivery Date</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1249</td>
                        <td>11/102020</td>
                        <td>
                            <button className="button1">open</button>
                        </td>
                        </tr>
                        <tr>
                        <td>1249</td>
                        <td>11/102020</td>
                        <td>
                            <button className="button1">open</button>
                        </td>
                        </tr>
                        <tr>
                        <td>1249</td>
                        <td>11/102020</td>
                        <td>
                            <button className="button1">open</button>
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