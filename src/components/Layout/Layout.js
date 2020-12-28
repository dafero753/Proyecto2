import React from 'react';
import { Container } from 'react-bootstrap';
import Menu from '../Menu';
import ImgAgs from '../../static/img/AGS.JPG';
import './style.css';

export default class Layout extends React.Component{
    render(){
        return(
            <Container fluid className="layout">
                <header className="d-flex justify-content-center flex-column align-items-center">
                    <img src={ImgAgs} alt="ags" className="image"/>   
                    <Menu></Menu>                 
                </header>
                <Container className="dinamic-content">
                    {this.props.children}
                </Container>
                <footer>                   
                </footer>
            </Container>

        )
    }
}