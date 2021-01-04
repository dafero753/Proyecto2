import React from 'react';
import { Button, Container, Form, Col, Table, Row } from 'react-bootstrap';
import './style.css';
import LayoutTwo from '../LayoutTwo/LayoutTwo';
import Cookies from 'universal-cookie';
import axios from 'axios';

//poner stores

const baseUrl = "https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/reports/GetClosedOrdersByDates";

const cookies = new Cookies()

export default class Sent extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            form:{
                companyId: '',
                date1: '',
                date2: '',                
            },
            data: {
                orderNo: '',
                orderDate: '',
            },
            stores: [cookies.get('stores')]
        }; 
        this.handleChange = this.handleChange.bind(this);
        //this.handleChange1 = this.handleChange1.bind(this);
      }  
    
    handleClick = e => {
        window.location.href="/detail-orders";
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
    }   

    go = async(e) => {
        e.preventDefault();
        const create = JSON.stringify({
            CompanyId: `${this.state.form.companyId}`,
            date1: `${this.state.form.date1}T00:00:00.000Z`,
            date2: `${this.state.form.date2}T23:59:59.000Z`
        })
        console.log(create)
        await axios.post(baseUrl, create, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then ( response => {
            return response.data;
        } )
        .then ( response => {
            if(response){
                var resp = response;
                cookies.set('orderNo', resp.orderNo, {path: "/"});
                cookies.set('orderedBy', resp.orderedBy, {path: "/"});
                cookies.set('orderDate', resp.orderDate, {path: "/"});   
                console.log(response)

                let res = document.querySelector('#res2');
                res.innerHTML=""
                for (let item of response){
                    res.innerHTML += `
                    <tr>
                        <td>${item.orderNo}</td>
                        <td>${item.orderDate}</td>
                        <td>
                            <button 
                            className="button1"
                            onClick={this.handleClick}
                            >></button>
                        </td>
                    </tr>`
                }
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
                <LayoutTwo className="border uplay">
                    <Container className="container-bottom">
                    <h2>Sent Orders</h2>
                    <Form onSubmit={(e)=>this.go(e)}>
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
                    <hr></hr>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Start</Form.Label>
                        <Form.Control type="date" name="date1"  onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>End</Form.Label>
                        <Form.Control type="date" name="date2"  onChange={this.handleChange}/>
                        </Form.Group>

                        <Button className="buttomDate" type="submit">GO</Button>

                        <hr></hr>
                    </Form.Row>
                </Form>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>Order N°.</th>
                            <th>Order Date</th>
                            <th>View</th>
                            </tr>
                        </thead>
                        <tbody id="res2">
                            <tr>
                            <td>-</td>
                            <td>-</td>
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