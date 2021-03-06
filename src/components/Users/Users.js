import React from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'
import ImgSpain from '../../static/img/spain.png'
import ImgUnited from '../../static/img/united.png'
import Cookies from 'universal-cookie';
import axios from 'axios';


const cookies = new Cookies()
const baseUrl = `https://orderentryappv1.azurewebsites.net/api/account/register/`



export default class Users extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            users: [],
            currentUsers: [],
            roles: [],
            stores: [],
            select: [],
            id: [],
            active: true,
            checked: '',
            existed: false,
        }
    }

    componentDidMount() {

        axios
        .get(`https://orderentryappv1.azurewebsites.net/api/users/${cookies.get('companyId')}/${cookies.get('roleId')}`)
        .then((response) => {
            this.setState({
                ...this.state,
                users: response.data,
            })
        })
        .catch((error) => {
            console.log(error);
        });
        axios
        .get(`https://orderentryappv1.azurewebsites.net/api/roles/${cookies.get('roleId')}`)
        .then((response) => {
            this.setState({
                ...this.state,
                roles: response.data,
            })
        })
        .catch((error) => {
            console.log(error);
        });
        axios
        .get(`https://orderentryappv1.azurewebsites.net/api/companies/${cookies.get('companyId')}/${cookies.get('roleId')}`)
        .then((response) => {
            this.setState({
                ...this.state,
                stores: response.data,
            })
        })
        .catch((error) => {
            console.log(error);
        });
    };

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
        .get(`https://orderentryappv1.azurewebsites.net/api/users/${cookies.get('companyId')}/${cookies.get('roleId')}`)
        .then((response) => {

            const data = response.data

            for (let i = 0; i < data.length; i++) {
                if(this.state.id === data[i].userCode) {
                    this.setState({
                        ...this.state,
                        currentUsers: data[i],
                    })
                }
            }            
        }).then(() => {
            if(this.state.currentUsers.userActive === true) {
                this.setState({
                    ...this.state,
                    checked: "checked"
                })
            }
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

    handleNewUserClick = async e => {
        console.log('click')
        e.preventDefault();

        const infoUser = JSON.stringify({
            userCode: `${this.state.newCode}`,
            userPassword: `${this.state.newPasword}`,
            ConfirmPassword: `${this.state.newConfirmPasword}`,
            userName: `${this.state.newName}`,
            userLanguage: `1`,
            userActive: `${this.state.active}`,
            companyId: `${this.state.newStore}`,
            roleId: `${this.state.newRole}`,
        })
        await axios.post(baseUrl, infoUser, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then ( response => {
            alert('New user added')
            return response.data;
        } )
        .then ( response => {
            document.querySelector("#form7").reset();
            document.querySelector("#form8").reset();
            document.querySelector("#form9").reset();
        })
        .catch ( error => {
            console.error('Error:', error);
            alert("Something went wrong");
        })        
    }

    handleSaveUserClick = async e => {
        console.log('click')
        e.preventDefault();

        let changePassword = 0;

        let userCode = "";
        let userPassword = "";
        let ConfirmPassword = "";
        let userName = "";
        let userLanguage = "";
        let userActive = "";
        let companyId = "";
        let roleId = "";
        let changepassword = "";

        if(this.state.newCode){
            userCode = this.state.newCode
        }else{
            userCode = this.state.currentUsers.userCode
        };
        if(this.state.newPassword){
            userPassword = this.state.newPassword
        }else{
            userPassword = this.state.currentUsers.userPassword
        };
        if(this.state.newConfirmPasword){
            ConfirmPassword = this.state.newConfirmPasword
        }else{
            ConfirmPassword = this.state.currentUsers.ConfirmPassword
        };
        if(this.state.newName){
            userName = this.state.newName
        }else{
            userName = this.state.currentUsers.userName
        };
        if(this.state.newlenguage){
            userLanguage = this.state.newlenguage
        }else{
            userLanguage = this.state.currentUsers.userLanguage
        };
        if(this.state.newStore){
            companyId = this.state.newStore
        }else{
            companyId = this.state.currentUsers.companyId
        };
        if(this.state.newRole){
            roleId = this.state.newRole
        }else{
            roleId = this.state.currentUsers.roleId
        };

        const infoUser = JSON.stringify({
            userCode: `${userCode}`,
            userPassword: `${userPassword}`,
            ConfirmPassword: `${ConfirmPassword}`,
            userName: `${userName}`,
            userLanguage: `${userLanguage}`,
            userActive: this.state.active,
            companyId: `${companyId}`,
            roleId: `${roleId}`,
            changepassword: changePassword,
        })

        console.log(infoUser)
        await axios.put(`https://orderentryappv1.azurewebsites.net/api/Users/${this.state.currentUsers.userCode}`, infoUser, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then ( response => {
            alert('User saved')
            return response.data;
        } )
        .then ( response => {
            document.querySelector("#form7").reset();
            document.querySelector("#form8").reset();
            document.querySelector("#form9").reset();
        })
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
                        <h2>User Maintenance</h2>
                        <Form id="form7">
                            <Form.Group>
                                <Form.Label>User Name</Form.Label>
                                <Form.Control as="select" defaultValue="User List" onChange={this.handleChange}>
                                <option>Select User</option>
                                {
                                    this.state.users.map((user, index) => {
                                        return(
                                            <option key={index} name={user.userName} id={user.userCode}>
                                                {user.userName}
                                            </option>
                                        )
                                    })
                                }
                                </Form.Control>
                            <hr></hr>
                                <Row>
                                    <Col>
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control placeholder="Code" defaultValue={this.state.currentUsers.userCode} onChange={this.setFieldValue} name="newCode" />
                                    </Col>
                                    <Col>
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
                                <Form.Control type="text" placeholder="Name" defaultValue={this.state.currentUsers.userName} onChange={this.setFieldValue} name="newName"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" defaultValue={this.state.currentUsers.userPassword} onChange={this.setFieldValue} name="newPasword"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" defaultValue={this.state.currentUsers.ConfirmPassword} onChange={this.setFieldValue} name="newConfirmPasword"/>
                            </Form.Group>
                        </Form>
                        <h3>Preferential language</h3>
                        <div className="leng">
                            <img src={ImgSpain} alt="ags" className="imageS"/>  
                            <img src={ImgUnited} alt="ags" className="imageU"/>  
                        </div>
                        <Form.Group>
                            <Form id="form8">
                                <Form.Label><strong>Role</strong></Form.Label>
                                <Form.Control as="select" placeholder="Role list" onChange={this.setFieldValue} name="newRole">
                                    <option>{this.state.currentUsers.roleId}</option>
                                    {
                                    this.state.roles.map((role, index) => {
                                        return(
                                            <option key={index} name={role.roleName}>
                                                {role.roleId}
                                            </option>
                                        )
                                    })
                                }
                                </Form.Control>
                            </Form>
                            <Form id="form9">
                                <Form.Label><strong>Store</strong></Form.Label>
                                <Form.Control as="select" placeholder="Store list" onChange={this.setFieldValue} name="newStore">
                                    <option>{this.state.currentUsers.companyId}</option>
                                    {
                                    this.state.stores.map((store, index) => {
                                        return(
                                            <option key={index} name={store.companyName}>
                                                {store.companyId}
                                            </option>
                                        )
                                    })
                                }                               
                                </Form.Control>
                            </Form>
                            {
                                this.state.existed ? (
                                    <Button className="b3" onClick = {this.handleSaveUserClick}>Save</Button>
                                ) : (
                                    <Button className="b3" onClick = {this.handleNewUserClick}>New User</Button>
                                )
                            }
                            
                        </Form.Group>
                    </Container>
                </LayoutTwo>
        )
    }
}