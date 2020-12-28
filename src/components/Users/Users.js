import React from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import './style.css'
import LayoutTwo from '../LayoutTwo/LayoutTwo'
import ImgSpain from '../../static/img/spain.png'
import ImgUnited from '../../static/img/united.png'

export default class Users extends React.Component{
     
    render(){
        return(
                <LayoutTwo className="border uplay">
                    <Container className="container-bottom">
                        <h2>User Maintenance</h2>
                        <Form>
                        <Button className="b3">New User</Button>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Control as="select" defaultValue="User List">
                                <option>User 1</option>
                                <option>User 2</option>
                                <option>User 3</option>
                                <option>User 4</option>
                                <option>User 5</option>
                            </Form.Control>
                            <hr></hr>
                            <Form>
                            <Row>
                                <Col>
                                <Form.Label>Code</Form.Label>
                                <Form.Control placeholder="Code" />
                                </Col>
                                <Col>
                                <Form.Label>Active</Form.Label>
                                <Form>
                                    <Form.Check 
                                        type="switch"
                                        id="custom-switch"
                                    />
                                </Form>
                                </Col>  
                            </Row>
                        </Form>
                        </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" />
                            </Form.Group>
                        </Form>
                        <h3>Preferential language</h3>
                        <div className="leng">
                            <img src={ImgSpain} alt="ags" className="imageS"/>  
                            <img src={ImgUnited} alt="ags" className="imageU"/>  
                        </div>
                        <Form.Group>
                            <Form>
                                <Form.Label><strong>Role</strong></Form.Label>
                                <Form.Control as="select" placeholder="Role list">
                                    <option>Role 1</option>
                                    <option>Role 2</option>
                                    <option>Role 3</option>
                                    <option>Role 4</option>
                                    <option>Role 5</option>
                                </Form.Control>
                            </Form>
                            <Form>
                                <Form.Label><strong>Store</strong></Form.Label>
                                <Form.Control as="select" placeholder="Store list">
                                    <option>Store 1</option>
                                    <option>Store 2</option>
                                    <option>Store 3</option>
                                    <option>Store 4</option>
                                    <option>Store 5</option>
                                </Form.Control>
                            </Form>
                            <Button className="b3">Save</Button>
                        </Form.Group>
                    </Container>
                </LayoutTwo>
        )
    }
}