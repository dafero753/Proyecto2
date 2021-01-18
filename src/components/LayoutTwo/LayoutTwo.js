import React from 'react';
import { Container } from 'react-bootstrap';
import Menu from '../Menu';
import {createBrowserHistory} from 'history';
import ImgAgs from '../../static/img/AGS.JPG';
import './style.css';

const history = createBrowserHistory()

export default class LayoutTwo extends React.Component{

    handleSubmit = e => {
        e.preventDefault();
        return history.back();
    }

    render(){
        return(
            <Container fluid className="layout">
                <header className="header d-flex justify-content-center flex-column align-items-center">
                    <div className="top">
                        <button onClick={this.handleSubmit} className="back">back</button>
                        <img src={ImgAgs} alt="ags" className="image1"/>   
                    </div>
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