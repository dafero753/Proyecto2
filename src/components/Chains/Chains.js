import React from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'
import axios from 'axios';

export default class Chains extends React.Component{
     
    constructor(props) {
        super(props);

        this.state = {
            chains: [],
            checked: '',
            active: true,
            currentChain: [],
            chainExisted: false,
        }
    }

    componentDidMount() {
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
                if(this.state.chainId == data[i].chainId) {
                    this.setState({
                        ...this.state,
                        currentChain: data[i],
                    })
                }
            }        
        }) 
        .then(() => {

            if(this.state.currentChain.chainActive === true) {
                this.setState({
                    ...this.state,
                    checked: "checked"
                })
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

    handleNewChainClick = async e => {
        e.preventDefault();
        console.log(this.state.newName)
        const infoUser = JSON.stringify({
            chainName: `${this.state.newName}`,
            chainActive: `${this.state.active}`,
        })
        console.log(infoUser)
        await axios.post(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/Chains`, infoUser, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then ( response => {
            alert('New Chain added')
            return response.data;
        } )
        .catch ( error => {
            console.error('Error:', error);
            alert("Something went wrong");
        })        

    }

    handleChecking = async e => {
        if(e.target.checked === true){
            await  this.setState({
                ...this.state,
                companyType: e.target.value
            })
        }
    }

    handleSaveChainClick = async e => {
        e.preventDefault();

        let chainName = "";
       
        if(this.state.newName){
            chainName = this.state.newName
        }else{
            chainName= this.state.currentChain.chainName
        };

        const infoUser = JSON.stringify({
            chainName: `${chainName}`,
            chainActive: `${this.state.active}`,
            
        })
        console.log(infoUser)
        await axios.put(`https://radiant-sierra-23083.herokuapp.com/https://orderentryappv1.azurewebsites.net/api/Chains/${this.state.currentChain.chainId}`, infoUser, {
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

    setFieldValue = async e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <LayoutTwo className="border uplay">
                <Container className="container-bottom">
                <h2>Chains Maintenance</h2>
                    <Form>
                        <Form.Group as={Col} >
                        <Form.Control as="select" defaultValue="Chain List" onChange={this.handleChange1} name="newChain">
                            <option>Select Chain</option>
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
                            <hr></hr>
                            <Form>
                            <Row>
                                <Col>
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
                            <Form.Control type="text" placeholder="Name" defaultValue={this.state.currentChain.chainName} onChange={this.setFieldValue} name="newName"/>
                        </Form.Group>
                        {
                                this.state.chainExisted ? (
                                    <Button className="b3" onClick = {this.handleSaveChainClick}>Save</Button>
                                ) : (
                                    <Button className="b3" onClick = {this.handleNewChainClick}>New Chain</Button>
                                )
                            }
                    </Form>
                </Container>
            </LayoutTwo>
        )
    }
}