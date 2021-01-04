import React from 'react';
import { Button, Container, Form, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import './style.css';
import LayoutTwo from '../LayoutTwo/LayoutTwo';
import Cookies from 'universal-cookie';

const baseUrl = "https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/OrderHeaders";

const cookies = new Cookies()



export default class Work extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            form:{
                companyId: '',
                deliveryDate: '',
                UserCodeCreation: '',
            },
            data: '',
            stores: [cookies.get('stores')]
        }; 
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
      }     


    handleChange = async e => {
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    handleChange1 = async e => {
        const options = e.target.options
        const select = []
        const price= []

        for(let i = 0; i < options.length; i++) {
            if(options[i].selected) {
                select.push(options[i].value);
                price.push(options[i].id);
            };
        }
        await this.setState({
            form:{
                ...this.state.form,
                companyId: select.toString()
            },
            data: price.toString()
        });
        await axios
        .get(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/OrderQueries/${this.state.form.companyId}/O`)
        .then(function(response) {         
            let res = document.querySelector('#res');
            res.innerHTML=""
            for (let item of response.data){
                res.innerHTML += `
                <tr>
                    <td>${item.orderNo}</td>
                    <td>${item.deliveryDate}</td>
                    <td>
                        <button className="button1">open</button>
                    </td>
                </tr>`
            }
        }.bind(this))  
        .catch(function(error) {
            console.log(error);
        }); 
    }    

    CreateNewOrder = async(e) => {
        e.preventDefault();
        const create = JSON.stringify({
            companyId: `${this.state.form.companyId}`, 
            deliveryDate: `${this.state.form.deliveryDate}T00:00:00`,
            UserCodeCreation: `${cookies.get('UserCode')}`
        })
        console.log(this.state.form)
        await axios.post(baseUrl, create, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then ( response => {
            console.log(response)
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
                cookies.set('pricelevel', this.state.data, {path: "/"});
                alert(`Order created with No ${resp.orderNo} and company ID No ${resp.companyId}`)
                window.location.href="/entry-orders";      
            }else {
                alert("something went wrong");
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
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control as="select" value={this.state.value} onChange={this.handleChange1}>
                        {this.state.stores[0].map(e => (    
                           <option key={e.companyId} id={e.pricelevel} value={e.companyId} name="companyId">
                                {e.companyName}
                            </option>
                        ))
                        }
                        </Form.Control> 
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
                    <tbody id="res">
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>
                                <button className="button1" disabled>open</button>
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