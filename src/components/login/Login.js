import React from 'react'
import Layout from '../Layout'
import { Form, Button, Container} from 'react-bootstrap'
import axios from 'axios';
//import md5 from 'md5';
import Cookies from 'universal-cookie'
import './style.css'

const baseUrl = "https://orderentryappv1.azurewebsites.net/api/account/login";
const cookies = new Cookies();

export default class Login extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            form:{
                UserCode: '',
                UserPassword: '',
            },
            data: []
        }; 
      } 
    
    handleChange = async e => {
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value, 
            }
        });
    }

    iniciarSesion = async(e) => {
        e.preventDefault();
        const login = JSON.stringify({
            UserCode: `${this.state.form.UserCode}`, 
            UserPassword: `${this.state.form.UserPassword}`
        })
        await axios.post(baseUrl, login, {
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
                cookies.set('companyId', resp.companyId, {path: "/"});
                cookies.set('roleId', resp.roleId, {path: "/"});
                cookies.set('token', resp.token, {path: "/"});
                cookies.set('UserCode', this.state.form.UserCode, {path: "/"});
                cookies.set('stores', resp.stores, {path: "/"});
                window.location.href="/order-entry-system";
                console.log(resp)
            }else {
                alert("user or password invalid");
            }
        })
        .catch ( error => {
            console.error('Error:', error);
            alert("user or password invalid");
        })
    }

    render(){
        return(
            <Layout>
                <Container className="initial-form">
                <h2>Order Entry System</h2>
                <Form onSubmit={(e)=>this.iniciarSesion(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter user" 
                        name="UserCode" 
                        onChange={this.handleChange}
                        />
                        
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Password"  
                        name="UserPassword"
                        onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button 
                    variant="primary" 
                    type="submit" 
                    className="first-buttom"
                    >
                        Login
                    </Button>
                </Form>
                </Container>
            </Layout>

        )
    }
}