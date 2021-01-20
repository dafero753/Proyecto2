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
            active: true,
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

    handleChange1 = async e => {

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
            chainSselect: select.toString(),
            chainId: id.toString(),
            chainExisted: true,
        });

        await axios
        .get(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/chains`)
        .then((response) => {

            const data = response.data

            for (let i = 0; i < data.length; i++) {
                console.log(data[i].chainId);
                if(this.state.chainId == data[i].chainId) {
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

    handleSaveStoreClick = async e => {
        e.preventDefault();

        let changePassword = 0;
        let companyId = "";
        let companyType = "";
        let companyAddress = "";
        let companyPhone = "";
        let companyEmail = "";
        let companyContactName = "";
        let chainId = "";
        let priceLevel = "";
        let companyCode = "";
        if(this.state.newStoreType){
            companyType = this.state.newStoreType
        }else{
            companyType = this.state.companyType
        };
        if(this.state.newAdress){
            companyAddress = this.state.newAdress
        }else{
            companyAddress = this.state.currentStore.companyAddress
        };
        if(this.state.newPhone){
            companyPhone = this.state.newPhone
        }else{
            companyPhone = this.state.currentStore.companyPhone
        };
        if(this.state.newEmail){
            companyEmail = this.state.newEmail
        }else{
            companyEmail = this.state.currentStore.companyEmail
        };
        if(this.state.newContact){
            companyContactName = this.state.newContact
        }else{
            companyContactName = this.state.currentStore.companyContactName
        };
        if(this.state.newPriceLevel){
            priceLevel = this.state.newPriceLevel
        }else{
            priceLevel = this.state.currentStore.pricelevel
        };
        if(this.state.newChain){
            chainId = this.state.newChain
        }else{
            chainId = this.state.currentStore.chainId
        };


        const infoUser = JSON.stringify({
            companyId: `${this.state.currentStore.companyId}`,
            companyType: `${companyType}`,
            companyName: `${this.state.currentStore.companyName}`,
            companyAddress: `${companyAddress}`,
            companyPhone: `${companyPhone}`,
            companyEmail: `${companyEmail}`,
            companyContactName: `${companyContactName}`,
            companyActive: this.state.active,
            chainId: `${chainId}`,
            pricelevel: `${priceLevel}`,
            companyCode: `${this.state.currentStore.companyCode}`,
        })
        console.log(infoUser)
        await axios.put(`https://orderentryappv1.azurewebsites.net/api/companies/${this.state.currentStore.companyId}`, infoUser, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then ( response => {
            alert('Company saved')
            return response.data;
        } )
        .catch ( error => {
            console.error('Error:', error);
            alert("Something went wrong");
        })    
    }

    handleNewStoreClick = async e => {
        e.preventDefault();
        console.log(this.state.currentChain)
        const infoUser = JSON.stringify({
            companyId: Math.round(Math.random()*100),
            companyType: `${this.state.companyType}`,
            companyName: `${this.state.newName}`,
            companyAddress: `${this.state.newAdress}`,
            companyPhone: `${this.state.newPhone}`,
            companyEmail: `${this.state.newEmail}`,
            companyContactName: `${this.state.newContact}`,
            companyActive: this.state.active,
            chainId: `${this.state.currentChain.chainId}`,
            pricelevel: `${this.state.newPriceLevel}`,
            companyCode: `${this.state.newStoreCode}`,
        })
        console.log(infoUser)
        await axios.post(`https://orderentryappv1.azurewebsites.net/api/companies`, infoUser, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then ( response => {
            alert('New Company added')
            return response.data;
        } )
        .catch ( error => {
            console.error('Error:', error);
            alert("Something went wrong");
        })        

    }

    setFieldValue = async e => {
        this.setState({[e.target.name]: e.target.value})
    }
     
    render(){
        return(
                <LayoutTwo className="border uplay">
                    <Container className="container-bottom">
                    <h2>Stores Maintenance</h2>
                        <Form className="form4">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Control as="select" defaultValue="Store List" onChange={this.handleChange}>
                                    <option>Select Company</option>
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
                                <Form.Control as="select" defaultValue="Chain List" onChange={this.handleChange1} name="newChain">
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
                                    <Row>
                                    <Form.Label as="legend" column sm={4}>
                                    Store Type
                                    </Form.Label>
                                    <Col xs={9} className="checkButton" key="checkButton" onChange={this.handleChecking} checked={this.state.checked}>
                                    <Form.Check type="radio" name="newStoreType" inline label="Single" value="SU" defaultChecked ={this.state.checkedSu}/>
                                    <Form.Check type="radio" name="newStoreType" inline label="Chain" value="SC" defaultChecked ={this.state.checkedSc} />
                                    <Form.Check type="radio" name="newStoreType" inline label="Distributor" value="DI" defaultChecked ={this.state.checkedCi}/>
                                    </Col>
                                    <Col className="activeStore">
                                    <Form.Label>Active</Form.Label>
                                    <Form.Check 
                                        type="switch"
                                        id="custom-switch"
                                        onChange={this.handleSwich}
                                        checked ={this.state.checked}
                                    />
                                    </Col>  
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" defaultValue={this.state.currentStore.companyName} onChange={this.setFieldValue} name="newName"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Address" defaultValue={this.state.currentStore.companyAddress} onChange={this.setFieldValue} name="newAdress" />
                            </Form.Group>
                            <Form.Group>
                            <Form.Label>Phone</Form.Label>
                                <Form.Control type="number" placeholder="Phone" defaultValue={this.state.currentStore.companyPhone} onChange={this.setFieldValue} name="newPhone" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="mail" placeholder="Email" defaultValue={this.state.currentStore.companyEmail} onChange={this.setFieldValue} name="newEmail" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contact</Form.Label>
                                <Form.Control type="text" placeholder="Contact" defaultValue={this.state.currentStore.companyContactName} onChange={this.setFieldValue} name="newContact" />
                            </Form.Group>
                                    <Row>
                                    <Col>
                                    <Form.Label>
                                    Price Level
                                    </Form.Label>
                                    <Col>
                                    <Form.Control type="text" placeholder="Price Level" defaultValue={this.state.currentStore.pricelevel} onChange={this.setFieldValue} name="newPriceLevel" />
                                    </Col>
                                    </Col>  
                                    <Col>
                                    <Form.Label>
                                    Store Code
                                    </Form.Label>
                                    <Col>
                                    <Form.Control type="number" placeholder="Store Code" defaultValue={this.state.currentStore.companyCode} onChange={this.setFieldValue} name="newStoreCode" />
                                    </Col>
                                    </Col> 
                                </Row>
                            {
                                this.state.existed ? (
                                    <Button className="b3" onClick = {this.handleSaveStoreClick}>Save</Button>
                                ) : (
                                    <Button className="b3" onClick = {this.handleNewStoreClick}>New Store</Button>
                                )
                            }
                        </Form>
                    </Container>
                </LayoutTwo>

        )
    }
}