import React from 'react'
import Nav from 'react-bootstrap/Nav'
import './style.css'


export default class Menu extends React.Component{
    render(){
        return(
        <Nav
            activeKey="/home"
            //onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
            <Nav.Item>
                <Nav.Link href="/">HOME</Nav.Link>
                <Nav.Link href="/auxiliaries">AUX MANT</Nav.Link>
            </Nav.Item>
        </Nav>
        )
    }
}