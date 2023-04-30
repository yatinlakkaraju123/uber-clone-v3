/*import React from 'react'
import { Outlet,Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
export default function driver_navbar() {
  return (
    <div>
      
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Cab on Go</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
          
            <button type="button" class="btn btn-success" onClick={() => this.acceptRide({ index })}>Submit</button>
              
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"></a>
            </li>
            
          </ul>
        </div>
      </nav>
    </div>
  )
}*/
import React, { Component } from 'react'
import Web3 from 'web3'
import { ABI, contract } from './config.js'
import ViewRide from './viewride'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData();

  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const scontract = new web3.eth.Contract(ABI, contract)
    this.setState({ scontract })


  }
  async viewRide() {
    this.setState({ view: '1' })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      view: ''
    }
  }


  render() {
    const { view } = this.state;
    return (
      <>
        <div>

          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Cab on Go</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">

                  <button type="button" class="btn btn-success" onClick={() => this.viewRide()}>View Ride</button>

                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#"></a>
                </li>

              </ul>
            </div>
          </nav>
          {view == '1' &&  <ViewRide/>}
          
        </div>
      </>
    );
  }


}


export default App;
