import React from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './style.css';
import LayoutTwo from '../LayoutTwo/LayoutTwo';
import Cookies from 'universal-cookie';

const cookies = new Cookies()
const baseUrl = "https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/ItemFiles/GetItem";   

export default class Entry extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            form:{
                PriceLevel: '',
                ItemCode: '',
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
            }
        }; 
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
            ItemCode: ``
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
                console.log(resp)            
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
        console.log(this.state)
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
                    <Form onSubmit={e => this.getItemInfo(e)}>    
                        <Form.Group >
                            <Form.Label>Item N°. / UPC</Form.Label>
                            <Form.Control  type="text" autoFocus="autofocus"  onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Order quantity</Form.Label>
                            <br></br>
                            <Form.Label>Cases</Form.Label>
                            <Form.Control type="text" placeholder="cases" />
                        </Form.Group>
                        <Button className="b2" type="submit">Add Item to Order</Button>
                    </Form>
                        <hr></hr>                    
                    <button className="buttom2">Item List on Order</button>
                    <Form>
                        <Row>
                            <Col>
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
                        <Button>Suspend Order</Button>
                        <Button className="red">Close Order</Button>
                    </Form.Group>
                    </Container>
                </LayoutTwo>
        )
    }
}