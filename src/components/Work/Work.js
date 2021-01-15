import React from 'react';
import { Button, Container, Form, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import './style.css';
import LayoutTwo from '../LayoutTwo/LayoutTwo';
import Cookies from 'universal-cookie';
import toastr from 'reactjs-toastr';
import swal from 'sweetalert';

const baseUrl = "https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/OrderHeaders";

const cookies = new Cookies()

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0,10);


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
            stores: [cookies.get('stores')],
            items: [],
        }; 
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleClick = this.handleClick.bind(this);
      }     

    handleClick = index =>{
        console.log(this.state.items[index])
        cookies.set('orderNo', this.state.items[index].orderNo, {path: "/"});
        cookies.set('deliveryDate', this.state.items[index].deliveryDate, {path: "/"});
        cookies.set('userCodeCreation', this.state.items[index].userCodeCreation, {path: "/"});
        window.location.href="/entry-orders";  
        document.querySelector("#workForm").reset();
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
            this.setState({
                ...this.state,
                items: response.data
            })      
            /*let res = document.querySelector('#res');
            res.innerHTML=""
            for (let item of response.data){
                res.innerHTML += `
                
                <tr>
                    <td>${item.orderNo}</td>
                    <td>${item.deliveryDate}</td>
                    <td>
                            <button id="theButton "style="
                            border-radius: 5px;
                            background-color: rgb(233,184,25);
                            border-radius: 5px;
                            color: rgb(21,13,97);
                        " 
                            >open</button>
                    </td>
                </tr>
                    `
            }*/
            console.log(this.state.items)
        }.bind(this))  
        .catch(function(error) {
            console.log(error);
        }); 
        console.log(this.state)
    }    

    CreateNewOrder = async(e) => {
        console.log(this.state.form.deliveryDate)
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
        document.querySelector("#workForm").reset();
    }

    render(){
        return(
            <LayoutTwo>
                <Container className="container-bottom">
                <h2>Work with orders</h2>
                <Form id="workForm" onSubmit={(e)=>this.CreateNewOrder(e)}>
                    <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control as="select" value={this.state.value} onChange={this.handleChange1} >
                            <option>Select a Company</option>
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
                        onChange={this.handleChange}
                        defaultValue={date}
                        min={date}/>
                        </Col>
                    </Form.Group>
                    <Button type="submit" className="buttonOrder1">Create New Order</Button>
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
                        {
                            this.state.items.map((item, index) => {
                                return(
                                <tr key={index}>
                                    <td>{item.orderNo}</td>
                                    <td>{item.deliveryDate}</td>
                                    <td>
                                        <button onClick={() => {this.handleClick(index)}}>open</button>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                    </Table>
                </Container>
            </LayoutTwo>

        )
    }
}