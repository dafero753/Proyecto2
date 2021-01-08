import React from 'react'
import { Container, Table } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

export default class Itemlist extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            form:{
                companyId: '',             
            },
        }; 
      }  
    
      componentDidMount() {
        axios.get(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/OrderDetails/${cookies.get('companyId')}/${cookies.get('orderNo')}/${cookies.get('priceLevel')}`)
        .then(function(response) { 
            console.log(response.data)        
            let res = document.querySelector('#res3');
            res.innerHTML=""
            for (let item of response.data){
                res.innerHTML += `
                <tr>
                    <td>${item.itemCode}</td>
                    <td>${item.description}</td>
                    <td>${item.size}</td>
                    <td>${item.orderCases}</td>
                    <td>${item.total}</td>
                </tr>`
            }
        }.bind(this))  
        .catch(function(error) {
            console.log(error);
        }); 
      }
     
    render(){
        return(
                <LayoutTwo className="border uplay">
                    <Container className="container-bottom">
                    <h2>Items list on order</h2>
                    <hr></hr>              
                    <Table striped bordered hover size="sm" className="table1">
                        <thead>
                            <tr>
                                <th>Item N°.</th>
                                <th>Description</th>
                                <th>Size</th>
                                <th>Cases</th>
                                <th>Total$</th>
                            </tr>
                        </thead>
                        <tbody id="res3">
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