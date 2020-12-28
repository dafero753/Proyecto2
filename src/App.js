import React from 'react'
import { Router, Route } from "react-router"
import {createBrowserHistory} from 'history';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './components/login'
import Order from './components/Order'
import './App.css'
import Work from './components/Work';
import Entry from './components/Entry';
import Report from './components/Report';
import Inquiry from './components/Inquiry/Inquiry';
import Sent from './components/Sent';
import Detail from './components/Detail'
import Price from './components/Price';
import Auxiliaries from './components/Auxiliaries';
import Users from './components/Users';
import Stores from './components/Stores';
import Chains from './components/Chains/Chains';

const history = createBrowserHistory()

function App() {
  return (
    <div className="App-container">
      <Router history={history}>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/order-entry-system" component={Order}></Route>
        <Route exact path="/work-with-orders" component={Work}></Route>
        <Route exact path="/entry-orders" component={Entry}></Route>
        <Route exact path="/inquiry-orders" component={Inquiry}></Route>
        <Route exact path="/report-orders" component={Report}></Route>
        <Route exact path="/sent-orders" component={Sent}></Route>
        <Route exact path="/detail-orders" component={Detail}></Route>
        <Route exact path="/price-orders" component={Price}></Route>
        <Route exact path="/auxiliaries" component={Auxiliaries}></Route>
        <Route exact path="/users" component={Users}></Route>
        <Route exact path="/stores" component={Stores}></Route>
        <Route exact path="/chains" component={Chains}></Route>
      </Router>
    </div>
  );
}

export default App;

