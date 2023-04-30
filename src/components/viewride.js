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
        this.setState({web3:web3})

        const data = await scontract.methods.get_ride_array().call();
        console.log(data);
        const d = [];
        
        this.setState({ request_ride_array: data });
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',

            request_ride_array: [],
            accepted_ride_array: [],
            display_request_ride_array:[],web3:null,isview:''
        }
    }
    async viewRide() {
        const { request_ride_array,web3 } = this.state;

        //const data = await scontract.methods.get_ride_array().call();
        //console.log(data);
        const d = [];
        
        //this.setState({ request_ride_array: data });
        for(let i=0;i<request_ride_array.length;i++)
        {
            if(!request_ride_array[i].isAccepted)
            {   console.log(request_ride_array[i].isAccepted);
                d.push(request_ride_array[i]);
            }
        }
        this.setState({display_request_ride_array:d});
        console.log(d);
        this.setState({isview:'1'})


    }
    async acceptRide (rideId) {
        const { scontract,web3 } = this.state;
        const ride_no = rideId.index;
        const name = 'yatin';
        const price = '45';
        const tx = await scontract.methods.accept_ride(ride_no, name, price).send({ from: this.state.account });
        const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
        const { events } = await scontract.getPastEvents('RideAccepted', { filter: { ride_no: ride_no }, fromBlock: receipt.blockNumber, toBlock: 'latest' });
        const accepted_ride = events[0].returnValues;
        const new_accepted_rides = [...this.state.accepted_ride_array, accepted_ride];
        this.setState({ accepted_ride_array: new_accepted_rides });
    
        // add this line to update display_request_ride_array
        const updated_display_request_ride_array = this.state.display_request_ride_array.filter((ride) => ride.index !== rideId.index);
        this.setState({ display_request_ride_array: updated_display_request_ride_array });
    }
    


    render() {
        const { request_ride_array, accepted_ride_array,display_request_ride_array } = this.state;
         const isview = this.state.isview
         
        return (
            <div>
                <div className="container">
                <div className='text-center'>
                <button type="button" class="btn btn-success" onClick={() => this.viewRide()}>View Requested Rides</button>
                </div>
                <div>
      {isview ? (
        <div><div className="card-deck">
        {display_request_ride_array.map((item, index) => (
            <div className="card" key={index}>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">from address: {item.from_address}</p>
                    <p className="card-text">to address: {item.to_address}</p>
                    <p className="card-text"> name: {item.name}</p>
                    <p className="card-text">date: {item.date}</p>
                    <p className="card-text">time: {item.time}</p>
                    <button type="button" class="btn btn-success" onClick={() => this.acceptRide({ index })}>Accept Ride</button>
                </div>
            </div>
        ))}
    </div></div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
            
            
                
                <div className='container'>



                    
                   
                        
                    </div>



                </div></div>
            




        );
    }

}
export default App;
