import React from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies()


export default class Stores extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            stores: [],
            currentStore: [],
            currentChain: [],
            chains: [],
            select: [],
            id: [],
            active: false,
            checked: '',
            existed: false,
            storeType: [
                {value: "SU", displayValue: "Single"},
                {value: "SC", displayValue: "Chaing"},
                {value: "DI", displayValue: "Distributor"},
            ],
            companyType: '',
            checkedSu: '',
            checkedSc: '',
            checkedCi: '',
        }
    }

    componentDidMount() {
        axios
        .get(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/companies`)
        .then((response) => {
            this.setState({
                ...this.state,
                stores: response.data,
            })
       
        })
        .catch((error) => {
            console.log(error);
        });
        axios
        .get(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/chains`)
        .then((response) => {
            this.setState({
                ...this.state,
                chains: response.data,
            })
        
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleChange = async e => {
        const options = e.target.options
        const select = []
        const id = []

        for(let i = 0; i < options.length; i++) {
            if(options[i].selected) {
                select.push(options[i].value);
                id.push(options[i].id);
            };
        }
        await this.setState({
            ...this.state,
            select: select.toString(),
            id: id.toString(),
            existed: true,
        });

        await axios
        .get(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/companies`)
        .then((response) => {

            const data = response.data
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                if(this.state.id === data[i].companyCode) {
                    this.setState({
                        ...this.state,
                        currentStore: data[i],
                    })
                }
            }         
        })
        .then(() => {
            if(this.state.currentStore.companyActive === true) {
                this.setState({
                    ...this.state,
                    checked: "checked"
                })
            }
        }).then(() => {
            if(this.state.currentStore.companyType === "SC" ) {
                this.setState({
                    ...this.state,
                    checkedSc: "checked"
                })
            }
        }).then(() => {
           if(this.state.currentStore.companyType === "SU") {
                this.setState({
                    ...this.state,
                    checkedSu: "checked",
                })
           }
        }).then(() => {
            if(this.state.currentStore.companyType === "CI") {
                this.setState({
                    ...this.state,
                    checkedCi: "checked",
                })
            }console.log(this.state)
        })
        .catch ( error => {
            console.error('Error:', error);
            console.log(error)
        })  
        await axios
        .get(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/chains`)
        .then((response) => {

            const data = response.data

            for (let i = 0; i < data.length; i++) {
                if(this.state.id === data[i].userCode) {
                    this.setState({
                        ...this.state,
                        currentChain: data[i],
                    })
                }
            }            
        }) 
        .catch ( error => {
            console.error('Error:', error);
            alert("Something went wrong");
        })  
    }

    handleSwich = async e => {
        if(e.target.checked === true) {
            await  this.setState({
                    ...this.state,
                    active: true,
                    checked: "checked",
                })
       }else {
        await  this.setState({
            ...this.state,
            active: false,
            checked: '',
        })
       }
        
    }

    handleChecking = async e => {
        console.log(e.target.value)
        if(e.target.checked === true){
            await  this.setState({
                ...this.state,
                companyType: e.target.value
            })
        }
    }

    handleSaveUserClick = async e => {
        console.log('click')
        e.preventDefault();

        let changePassword = 0;

        const infoUser = JSON.stringify({
            companyId: `${this.state.currentStore.companyId}`,
            companyType: ``,
            companyName: ``,
            companyAddress: ``,
            companyPhone: ``,
            companyEmail: ``,
            companyContactName: ``,
            companyActive: ``,
            chainId: ``,
            pricelevel: ``,
            companyCode: ``,
        })

        console.log(infoUser)
        await axios.put(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/companies/${this.state.currentStore.companyCode}`, infoUser, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then ( response => {
            alert('User saved')
            return response.data;
        } )
        .catch ( error => {
            console.error('Error:', error);
            alert("Something went wrong");
        })        
    }
     
    render(){
        return(
                <LayoutTwo className="border uplay">
                    <Container className="container-bottom">
                    <h2>Stores Maintenance</h2>
                        <Form className="form4">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Control as="select" defaultValue="Store List" onChange={this.handleChange}>
                                    <option></option>
                                    {
                                        this.state.stores.map((store, index) => {
                                            return(
                                                <option key={index} name={store.companyName} id={store.companyCode}>
                                                    {store.companyName}
                                                </option>
                                            )
                                        })
                                    }
                                </Form.Control>
                                <hr></hr>
                                <Form.Label>Chain</Form.Label>
                                <Form.Control as="select" defaultValue="Chain List">
                                    <option>{this.state.currentStore.chainId}</option>
                                    {
                                        this.state.chains.map((chain, index) => {
                                            return(
                                                <option key={index} name={chain.chainName} id={chain.chainId}>
                                                    {chain.chainId}
                                                </option>
                                            )
                                        })
                                    }
                                </Form.Control>
                                <Form className="form4">
                                    <Row>
                                    <Form.Label as="legend" column sm={4}>
                                    Store Type
                                    </Form.Label>
                                    <Col xs={9} className="checkButton" key="checkButton" onChange={this.handleChecking} checked={this.state.checked}>
                                    <Form.Check type="radio" name="storeType" inline label="Single" value="SU" checked ={this.state.checkedSu}/>
                                    <Form.Check type="radio" name="storeType" inline label="Chain" value="SC" checked ={this.state.checkedSc} />
                                    <Form.Check type="radio" name="storeType" inline label="Distributor" value="DI" checked ={this.state.checkedCi}/>
                                    </Col>
                                    <Col className="activeStore">
                                    <Form.Label>Active</Form.Label>
                                    <Form>
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                            onChange={this.handleSwich}
                                            checked ={this.state.checked}
                                        />
                                    </Form>
                                    </Col>  
                                </Row>
                            </Form>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" defaultValue={this.state.currentStore.companyName} disabled/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Address" defaultValue={this.state.currentStore.companyAddress}/>
                            </Form.Group>
                            <Form.Group>
                            <Form.Label>Phone</Form.Label>
                                <Form.Control type="number" placeholder="Phone" defaultValue={this.state.currentStore.companyPhone}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="mail" placeholder="Email" defaultValue={this.state.currentStore.companyEmail}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contact</Form.Label>
                                <Form.Control type="text" placeholder="Contact" defaultValue={this.state.currentStore.companyContactName}/>
                            </Form.Group>
                            <Form className="form4">
                                    <Row>
                                    <Col>
                                    <Form.Label>
                                    Price Level
                                    </Form.Label>
                                    <Col>
                                    <Form.Control type="text" placeholder="Price Level" defaultValue={this.state.currentStore.pricelevel}/>
                                    </Col>
                                    </Col>  
                                    <Col>
                                    <Form.Label>
                                    Store Code
                                    </Form.Label>
                                    <Col>
                                    <Form.Control type="number" placeholder="Store Code" defaultValue={this.state.currentStore.companyCode}/>
                                    </Col>
                                    </Col> 
                                </Row>
                            </Form>
                            {
                                this.state.existed ? (
                                    <Button className="b3" onClick = {this.handleSaveUserClick}>Save</Button>
                                ) : (
                                    <Button className="b3" onClick = {this.handleNewUserClick}>New Store</Button>
                                )
                            }
                        </Form>
                    </Container>
                </LayoutTwo>

        )
    }
}