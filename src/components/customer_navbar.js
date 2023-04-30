
import React, { Component } from 'react'
import Web3 from 'web3'
import { ABI, contract } from './config.js'
import RequestRide from './requestride'

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
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Megabytes</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
             
              <button type="button" class="btn btn-success" onClick={() => this.viewRide()}>Request Ride</button>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Payment</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {view == '1' &&  <RequestRide/>}
        
          
        </div>
      </>
    );
  }


}
export default App;

