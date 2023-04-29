import React, { Component } from 'react'
import Web3 from 'web3'
import { ABI, contract } from './config.js'

import CustomerNavbar from './customer_navbar.js'
import DriverNavbar from './driver_navbar.js'
import RequestRide from './requestride'
import ViewRide from './viewride'
import Main from './main.js'
import Customer from './customer.js'
import Driver from './driver.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
class App extends Component {
    componentWillMount() {
        this.loadBlockchainData();
       
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const scontract = new web3.eth.Contract(ABI, contract)
        this.setState({ scontract}, () => {
            this.driver_or_register(); })
        

    }
    async driver_or_register(){
        const {account,scontract} = this.state;
        const c = await scontract.methods.get_customer_array().call();
        const found_customer = c.find(element=>element.user == account);
        const d = await scontract.methods.get_driver_array().call();
        const found_driver = d.find(element=>element.user == account);
        if(found_customer)
        {
            this.setState({role:'0'})
        }
        else if(found_driver)
        {
            this.setState({role:'1'})
        }
        else
        {
            this.setState({role:-'1'})
        }
        
    }
    async see_role()
    {
        const {role} = this.state;
        console.log(role);
    }
   
    constructor(props) {
        super(props)
        this.state = { account: '',
    role:'', }
    }
    
    
    render() {
        const {role}  =this.state;
            return (
                <>
                {role=='0' && <Customer/>}
                {role=='1' && <Driver/>}
                </>
            );
        }
        
    
}


export default App;