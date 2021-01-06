import React from 'react'
import { Container, Form, Row, Col, Table } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'
import axios from 'axios';


const dataOrders = []

export default class Detail extends React.Component{

    componentDidMount() {
        axios.get(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/reports/3/2`)
        .then(function(response) {      
            let res = document.querySelector('#res4');
            res.innerHTML=""
            for (let item of response.data.items){
                res.innerHTML += `
                <tr>
                    <td>${item.itemCode}</td>
                    <td>${item.description}</td>
                    <td>${item.size}</td>
                    <td>${item.cases}</td>
                    <td>${item.price}</td>
                    <td>${item.total}</td>
                </tr>`
            }
            dataOrders.push(response)
            console.log(dataOrders[0].data.cases)
        }.bind(this))  
        .catch(function(error) {
            console.log(error);
        }); 
      }
     
    render(){
        console.log(dataOrders)
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
                                <th>Unit $</th>
                                <th>Total $</th>
                            </tr>
                        </thead>
                        <tbody id="res4">
                            <tr>
                                <td>71500270045</td>
                                <td>Oreo Cookie White</td>
                                <td>24</td>
                                <td>15</td>
                                <td>3.50</td>
                                <td>1,260.00</td>
                            </tr>
                            <tr>
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
                            </tr>
                            <tr>
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
                            </tr>
                            <tr>
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
                            </tr>
                            <tr>
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