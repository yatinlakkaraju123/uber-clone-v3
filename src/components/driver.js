/*import React from 'react'
import DriverNavbar from './driver_navbar.js'
import { Route, Routes,BrowserRouter as Router,createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import ViewRide from './viewride'

export default function customer() {
  return (
    <div>
      <DriverNavbar/>
      
    
      
    </div>
  )
}*/
import React, { Component } from 'react'
import Web3 from 'web3'
import { ABI, contract } from './config.js'
import DriverNavbar from './driver_navbar.js'

class App extends Component {
    componentWillMount() {
        this.loadBlockchainData();
       
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const scontract = new web3.eth.Contract(ABI, contract)
        this.setState({ scontract} )
        

    }
    
   
    constructor(props) {
        super(props)
        this.state = { account: '',
     }
    }
    
    
    render() {
        const {role}  =this.state;
            return (
                <>
                <DriverNavbar/>
                </>
            );
        }
        
    
}


export default App;
