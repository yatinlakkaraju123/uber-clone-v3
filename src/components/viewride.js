import React, { Component } from 'react'
import Web3 from 'web3'
import { ABI, contract } from './config'


class App extends Component {
    componentWillMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const scontract = new web3.eth.Contract(ABI, contract)
        this.setState({ scontract })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',

            request_ride_array: [],
            accepted_ride_array: []
        }
    }
    async viewRide() {
        const { scontract } = this.state;

        const data = await scontract.methods.get_ride_array().call();
        this.setState({ request_ride_array: data });


    }
    async acceptRide (rideId) {
        const { scontract } = this.state;
        const ride_no = rideId.index;
        const name = 'yatin';
        const price = '123';
        scontract.methods.accept_ride(ride_no, name, price).send({ from: this.state.account });
        const a_rides = await scontract.methods.get_accept_ride_array().call();
        console.log(a_rides);
        this.setState({ accepted_ride_array: a_rides });

    }



    render() {
        const { request_ride_array, accepted_ride_array } = this.state;
        return (
            <div className="container">

                <button type="button" class="btn btn-success" onClick={() => this.viewRide()}>View Requested Rides</button>
                <div className='container'>



                    <div className="card-deck">
                        {request_ride_array.map((item, index) => (
                            <div className="card" key={index}>
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">from address: {item.from_address}</p>
                                    <p className="card-text">to address: {item.to_address}</p>
                                    <p className="card-text"> name: {item.name}</p>
                                    <p className="card-text">date: {item.date}</p>
                                    <p className="card-text">time: {item.time}</p>
                                    <button type="button" class="btn btn-success" onClick={() => this.acceptRide({ index })}>Submit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h4>Accept array</h4>
                        <div className="card-deck">
                        {accepted_ride_array.map((item, index) => (
                            <div className="card" key={index}>
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">from address: {item.from_address}</p>
                                    <p className="card-text">to address: {item.to_address}</p>
                                    <p className="card-text"> name: {item.name}</p>
                                    <p className="card-text">date: {item.date}</p>
                                    <p className="card-text">time: {item.time}</p>
                                    <p className="card-text">time: {item.driver_name}</p>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                        
                    </div>



                </div>
            </div>




        );
    }

}
export default App;
