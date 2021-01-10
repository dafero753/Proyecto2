import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './style.css';
import LayoutTwo from '../LayoutTwo/LayoutTwo';
import Cookies from 'universal-cookie';

const cookies = new Cookies()
const baseUrl = "https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/ItemFiles/GetItem";   
const baseUrl2 = "https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/OrderDetails";   
const baseUrl3 = "https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/orderheaders/Close";   
const baseUrl4 = "https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/orderheaders/Suspend";   
const baseUrl5 = `https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/OrderDetails/${cookies.get('companyId')}/${cookies.get('orderNo')}/${cookies.get('ItemcCode')}`;   
const baseUrl6 = `https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/OrderDetails/${cookies.get('companyId')}/${cookies.get('orderNo')}/${cookies.get('ItemcCode')}`;   


export default class Entry extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            form:{
                PriceLevel: '',
                ItemCode: '',
                companyId: '',
                OrderNo: '',
                ItemCode: '',
                OrderCases: '',
                Price: '',
                UserCodeModification: '',
            },
            itemData: {
                priceLevel: '',
                itemCode: '',
                upc: '',
                description: '',
                brand: '',
                pack: '',
                size: '',
                uom: '',
                price: '',
                deal: '',
                dealOff: '',
                status: '',
                date: '',
                oldPrice:'',
            },
            buttons: [],
            existed: false,
        }; 
      } 
     


      handleSubmit = e => {
        e.preventDefault();
        const bodyInfo = JSON.stringify({
            companyId: `${cookies.get('companyId')}`,
            orderNo: `${cookies.get('orderNo')}`,
            orderDate: `${cookies.get('orderDate')}`,
            orderStatus: `${cookies.get('orderStatus')}`,
            deliveryDate: `${cookies.get('deliveryDate')}`,
            userCodeModification: `${cookies.get('userCodeModification')}`, 
        })
        axios.put(baseUrl3, bodyInfo, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            alert('Order closed!')
            return response.data
        })
      }

      handleSubmit1 = e => {
        e.preventDefault();
        const bodyInfo = JSON.stringify({
            companyId: `${cookies.get('companyId')}`,
            orderNo: `${cookies.get('orderNo')}`,
            orderDate: `${cookies.get('orderDate')}`,
            orderStatus: `${cookies.get('orderStatus')}`,
            deliveryDate: `${cookies.get('deliveryDate')}`,
            userCodeModification: `${cookies.get('userCodeModification')}`, 
        })
        axios.put(baseUrl4, bodyInfo, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            alert('Order suspended!')
            return response.data
        })
      }

      handleClick = e => {
        window.location.href="/item-list-on-order";
    }
    handleClick3 = e => {
        console.log('click on save')
        e.preventDefault();
        const bodyInfo = JSON.stringify({
            companyId: `${cookies.get('companyId')}`,
            OrderNo: `${cookies.get('orderNo')}`,
            ItemCode: `${this.state.itemData.itemCode}`,
            OrderCases: `${this.state.form.OrderCases}`,
            Price: `${this.state.itemData.price}`,
            company: null,
        })
        axios.put(baseUrl3, bodyInfo, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            alert('Item Saved!')
            return response.data
        })
    }
    
    handleClick4 = e => {
        console.log('click on delete')
        e.preventDefault();
        const bodyInfo = JSON.stringify({
            companyId: `${cookies.get('companyId')}`,
            OrderNo: `${cookies.get('orderNo')}`,
            ItemCode: `${this.state.itemData.itemCode}`,
            OrderCases: `${this.state.form.OrderCases}`,
            Price: `${this.state.itemData.price}`,
            company: null,
        })
        axios.put(baseUrl3, bodyInfo, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            alert('Item Deleted!')
            return response.data
        })
    }
    
    handleChange = async e => {
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value, 
            },
        })
    }  
      
    getItemInfo = async(e) => {
        e.preventDefault();
        const itemInfo = JSON.stringify({
            PriceLevel: `${cookies.get('pricelevel')}`,
            ItemCode: `${this.state.form.ItemCode}`,
        })
        await axios.post(baseUrl, itemInfo, {
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
                cookies.set('priceLevel', resp.priceLevel, {path: "/"});
                cookies.set('itemCode', resp.itemCode, {path: "/"});
                cookies.set('upc', resp.upc, {path: "/"});
                cookies.set('description', resp.description, {path: "/"});
                cookies.set('brand', resp.brand, {path: "/"});
                cookies.set('pack', resp.pack, {path: "/"});
                cookies.set('size', resp.size, {path: "/"});
                cookies.set('uom', resp.uom, {path: "/"});
                cookies.set('price', resp.price, {path: "/"});
                cookies.set('deal', resp.deal, {path: "/"});
                cookies.set('dealOff', resp.dealOff, {path: "/"});
                cookies.set('status', resp.status, {path: "/"});
                cookies.set('date', resp.date, {path: "/"});
                cookies.set('oldPrice', resp.oldPrice, {path: "/"});            
            }
            else {
                alert("wrong code");
            }
        })
        .catch ( error => {
            console.error('Error:', error);
            alert("invalid item");
        })
        this.setState({
            itemData:{
                ...this.state.itemData,
                priceLevel: `${cookies.get('priceLevel')}`,
                itemCode: `${cookies.get('itemCode')}`,
                upc: `${cookies.get('upc')}`,
                description: `${cookies.get('description')}`,
                brand: `${cookies.get('brand')}`,
                pack: `${cookies.get('pack')}`,
                size: `${cookies.get('size')}`,
                uom: `${cookies.get('uom')}`,
                price: `${cookies.get('price')}`,
                deal: `${cookies.get('deal')}`,
                dealOff: `${cookies.get('dealOff')}`,
                status: `${cookies.get('status')}`,
                date: `${cookies.get('date')}`,
                oldPrice: `${cookies.get('oldPrice')}`,           
            }
        });

        const itemInfo2 = JSON.stringify({
            companyId: `${cookies.get('companyId')}`,
            OrderNo: `${cookies.get('orderNo')}`,
            ItemCode: `${this.state.itemData.itemCode}`,
            OrderCases: `${this.state.form.OrderCases}`,
            Price: `${this.state.itemData.price}`,
            UserCodeModification: `${cookies.get('userCodeModification')}`,
        })
        if(this.state.form.OrderCases != 0 && this.state.form.OrderCases != undefined){
            await axios.post(baseUrl2, itemInfo2, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then ( response => {
                console.log(response.data)
                if(response.data.exist == 0){
                return response.data;
                }else{
                    this.setState({ existed: true});
                    alert('Item already exist in order')
                    let res = document.querySelector('#botonChange');
                    res.innerHTML=""
                    /*let res2 = document.querySelector('#newBotton');
                    res2.innerHTML=""
                    res2.innerHTML += `
                        <button id="ThisButton"style="
                            background-color: #5dd65d;
                            box-shadow: 2px 2px 5px rgb(62,74,129);
                            margin-right: 20px;
                            border-radius: 5px;
                            color: withe;
                        ">Save Item</button>
                        <button style="
                        background-color: #d65d5d;
                        box-shadow: 2px 2px 5px rgb(62,74,129);
                        margin-right: 20px;
                        border-radius: 5px;
                        color: withe;
                        ">Delete Item</button>
                        `*/
                    
                    console.log('entro!!')
                }
            } )
            .then ( response => {
                if(response){
                    var resp = response;
                    cookies.set('orderDetail', resp.orderDetail, {path: "/"});
                    cookies.set('exist', resp.exist, {path: "/"});
                    cookies.set('message', resp.message, {path: "/"}); 
                    console.log(resp)  
                    alert('Item added')          
                }
            })
            .catch ( error => {
                console.error('Error:', error);
                alert("invalid item");
            })
        }else {
            alert('need a cases number')
        }
        document.querySelector("#myForm").reset();
        console.log(this.state.buttons)
    }
     
    render(){
        return(
                <LayoutTwo>
                    <Container className="container-bottom">
                    <h2>Order entry</h2>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                            Order N°.
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="number" name="brand" defaultValue={cookies.get('orderNo')} disabled/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                            Delivery date
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="text" name="brand" defaultValue={cookies.get('deliveryDate')} disabled />
                            </Col>
                        </Form.Group>
                    </Form>
                        <hr></hr>
                    <Form onSubmit={e => this.getItemInfo(e)} id="myForm">    
                        <Form.Group >
                            <Form.Label>Item N°. / UPC</Form.Label>
                            <Form.Control  type="text" autoFocus="autofocus" name="ItemCode" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Order quantity</Form.Label>
                            <br></br>
                            <Form.Label>Cases</Form.Label>
                            <Form.Control type="number" placeholder="cases" name="OrderCases" onChange={this.handleChange}/>
                        </Form.Group>
                        <div id="botonChange">
                            <Button className="b2" type="submit">Add Item to Order</Button>
                        </div>
                    </Form>
                        {
                            this.state.existed ? (
                                <div>
                                    <button className="buttonSave" onClick={this.handleClick3}>Save</button>
                                    <button className="buttonDelete" onClick={this.handleClick4}>Delete</button>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                      
                        <hr></hr>                    
                    <button className="buttom2" onClick={this.handleClick}>Item List on Order</button>
                    <Form>
                        <Row>
                            <Col xs={5}>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control disabled placeholder="Brand" name="brand" defaultValue={this.state.itemData.brand} />
                            </Col>
                            <Col>
                            <Form.Label>Pack</Form.Label>
                            <Form.Control disabled placeholder="Pack" name="pack" defaultValue={this.state.itemData.pack} />
                            </Col>  
                            <Col>
                            <Form.Label>Size</Form.Label>
                            <Form.Control disabled placeholder="Size" name="size" defaultValue={this.state.itemData.size} />
                            </Col>
                            <Col>
                            <Form.Label>UOM</Form.Label>
                            <Form.Control disabled placeholder="UOM" name="uom" defaultValue={this.state.itemData.uom} />
                            </Col>  
                        </Row>
                    </Form>
                    <Form.Group>
                        <Form.Label>Descrption</Form.Label>
                        <Form.Control type="text" disabled name="description" defaultValue={this.state.itemData.description} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>UPC</Form.Label>
                        <Form.Control type="text" placeholder="UPC" disabled name="upc" defaultValue={this.state.itemData.upc} />
                    </Form.Group>
                    <Form className="form4"> 
                        <Row>
                            <Col>
                            <Form.Label>Case $</Form.Label>
                            <Form.Control disabled placeholder="Case" />
                            </Col>
                            <Col>
                            <Form.Label>Unit $</Form.Label>
                            <Form.Control disabled placeholder="Unit" name="price" defaultValue={this.state.itemData.price} />
                            </Col>  
                            <Col>
                            <Form.Label>Deal $</Form.Label>
                            <Form.Control disabled placeholder="Deal" name="deal" defaultValue={this.state.itemData.deal} />
                            </Col>
                        </Row>
                    </Form>
                    <Form.Group className="buttoms">
                        <Button onClick={this.handleSubmit1}>Suspend Order</Button>
                        <Button className="red" onClick={this.handleSubmit}>Close Order</Button>
                    </Form.Group>
                    </Container>
                </LayoutTwo>
        )
    }
}