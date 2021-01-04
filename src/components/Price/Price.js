import React from 'react'
import { Container, Table } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

export default class Price extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            form:{
                companyId: '',             
            },
        }; 
      }  
    
      componentDidMount() {
        axios.get(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/reports/1`)
        .then(function(response) {         
            let res = document.querySelector('#res3');
            res.innerHTML=""
            for (let item of response.data){
                res.innerHTML += `
                <tr>
                    <td>${item.itemCode}</td>
                    <td>${item.description}</td>
                    <td>${item.priceNow}</td>
                    <td>${item.priceBefore}</td>
                    <td>${item.diff}</td>
                    <td>${item.percentage}</td>
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
                    <h2>Items with Price change </h2>
                    <hr></hr>              
                    <Table striped bordered hover size="sm" className="table1">
                        <thead>
                            <tr>
                                <th>Item N°.</th>
                                <th>Description</th>
                                <th>$ Now</th>
                                <th>Before</th>
                                <th>Diff</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody id="res3">
                            <tr>
                                <td>71500270045</td>
                                <td>Oreo Cookie White</td>
                                <td>25.50</td>
                                <td>24</td>
                                <td>0.82</td>
                                <td>3.2</td>
                            </tr>
                            <tr>
                                <td>71500270358</td>
                                <td>Oreo Cookie Mint</td>
                                <td>36.25</td>
                                <td>37.79</td>
                                <td>-1.54</td>
                                <td>-4.25</td>
                            </tr>
                            <tr>
                                <td>71500276282</td>
                                <td>Oreo Cookie Origl</td>
                                <td>33.55</td>
                                <td>35.30</td>
                                <td>1.75</td>
                                <td>5.22</td>
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