import React, { Component } from 'react'
import Web3 from 'web3'
import {ABI,contract} from './config'

class App extends Component {
    componentWillMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const scontract = new web3.eth.Contract(ABI, contract)
        this.setState({ scontract })
    }
    async requestRide(){
       
        const{scontract,name,from,to,date,time} = this.state;
        await scontract.methods.request_ride(from,to,name,time,date).send({from:this.state.account})
        const ride_arrays = await scontract.methods.ride_array().call();
        this.setState(ride_arrays);
       
    }
    constructor(props) {
        super(props)
        this.state = { account: '',
    name:'',
from:'',
to:'',
date:'',
time:'',
ride_arrays:[] }
    }
    handleNameChange = (event) => {
        this.setState({ name: event.target.value })
      }
      handleFromChange = (event) => {
        this.setState({ from: event.target.value })
      }
      handleToChange = (event) => {
        this.setState({ to: event.target.value })
      }
      handleDateChange = (event) => {
        this.setState({ date: event.target.value })
      }
      handleTimeChange = (event) => {
        this.setState({ time: event.target.value })
      }

    render() {
        return (
            <div className="container">
                <h1>Customer</h1>
                <form>
                    <div class="container mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" id="exampleTo"value={this.state.name}
            onChange={this.handleNameChange} />
                    </div>

                    <div class="container mb-3">
                        <label class="form-label">From</label>
                        <input type="text" class="form-control" id="examplefrom" aria-describedby="emailHelp" value={this.state.from}
            onChange={this.handleFromChange}/>
                    </div>
                    <div class="container mb-3">
                        <label class="form-label">To</label>
                        <input type="text" class="form-control" id="exampleTo" value={this.state.to}
            onChange={this.handleToChange} />
                    </div>


                    <div class="container mb-3 flex">
                        <label class="form-label">Date</label>
                        <input type="date" class="form-control" id="exampleTo" value={this.state.date}
            onChange={this.handleDateChange} />
                    </div>
                    <div class="container mb-3 flex">
                        <label class="form-label">Time</label>
                        <input type="time" class="form-control" id="exampleTo" value={this.state.time}
            onChange={this.handleTimeChange}/>
                    </div>
                    <button  type="button"class="btn btn-success" onClick={() => this.requestRide()}>Submit</button>
                </form>
                
            </div>
        );
    }
}

export default App;