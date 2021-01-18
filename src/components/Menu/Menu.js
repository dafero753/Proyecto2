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
                <Nav.Link href="/order-entry-system">HOME</Nav.Link>
                { this.props.role == 10 || this.props.role == 1?
                    <Nav.Link href="/auxiliaries">AUX MANT</Nav.Link>
                    : <div></div>
                }
            </Nav.Item>
        </Nav>
        )
    }
}