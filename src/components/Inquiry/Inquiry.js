import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import './style.css'
import LayoutThree from '../LayoutThree/LayoutThree'
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl = "https://orderentryappv1.azurewebsites.net/api/ItemFiles/GetItem";

const cookies = new Cookies()

export default class Inquiry extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            form:{
                companyId: '',
                PriceLevel: '',
                ItemCode: '',
            },
            data: '',
            stores: [cookies.get('stores')],
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
                companyId: select.toString(),
                PriceLevel: price.toString()

            },
        });
    }

    getItemInfo = async(e) => {
        e.preventDefault();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value, 
            },
        })
        const itemInfo = JSON.stringify({
            PriceLevel: `${this.state.form.PriceLevel}`,
            ItemCode: `${this.state.form.ItemCode}`,
        })
        console.log(itemInfo)
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
    }
     
    render(){
        return(
                <LayoutThree className="border uplay">
                    <Container className="container-bottom">
                    <h2>Item Inquiry</h2>
                    <Form onSubmit={(e)=>this.getStore(e)} id="storeInfo">
                    <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control as="select" value={this.state.value} onChange={this.handleChange1}>
                        <option>Select a Company</option>
                        {this.state.stores[0].map(e => (    
                           <option key={e.companyId} id={e.pricelevel} value={e.companyId} name="companyId" >
                                {e.companyName}
                            </option>
                        ))
                        }
                        </Form.Control> 
                    </Form.Group>
                    </Form>
                    <Form id="itemForm" onChange={e => this.getItemInfo(e)}>
                        <Form.Group >
                            <Form.Label>Item N°. / UPC</Form.Label>
                            <Form.Control id="ItemCode" type="text" autoFocus="autofocus" name="ItemCode"/>
                        </Form.Group>
                    </Form>
                        <hr></hr>
                    <Form>
                        <Form.Group>
                            <Form.Label>Item No°</Form.Label>
                            <Form.Control type="text" disabled placeholder="item N°" defaultValue={this.state.form.ItemCode} />
                        </Form.Group>
                    </Form>
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
                    <Form.Group>
                        <Form.Label>UPC</Form.Label>
                        <Form.Control type="text" placeholder="UPC" disabled name="upc" defaultValue={this.state.itemData.upc} />
                    </Form.Group>
                    </Container>
                </LayoutThree>
        )
    }
}