import React, { Component } from 'react'
import Web3 from 'web3'
import { ABI, contract } from './config.js'


class App extends Component {
    componentWillMount() {
        this.loadBlockchainData();
       
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
        this.setState({web3:web3})
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const scontract = new web3.eth.Contract(ABI, contract)
        this.setState({ scontract} )
        const data = await scontract.methods.get_accept_ride_array().call();
        const a = []
        console.log(data);
        for(let i=0;i<data.length;i++)
        {
            if(data[i].isPayed==false)
            {
                a.push(data[i]);
            }
        }
        
        console.log("pushed data",a);
        this.setState({ accepted_ride_array: a });
        this.setState({list_ride_array:data});
       // const a = data.filter(item => !item.isPayed);
    
        this.setState({
            web3: web3,
            account: accounts[0],
            scontract: scontract,
            list_ride_array: data,
           
        });

    }
    async payRide(rideID){
        const { scontract,list_ride_array,account,web3, accepted_ride_array } = this.state;
        const ride_no = rideID;
        const pay_array = list_ride_array[ride_no];
        const p = pay_array.price;
       
            try{
                const tx =  await scontract.methods.pay_driver(ride_no).send({from:account,value:web3.utils.toWei('1', 'ether')});
                console.log(tx);
                const updatedRide = { ...accepted_ride_array[ride_no], isPayed: true };
            const newAcceptedRideArray = [ ...accepted_ride_array ];
            newAcceptedRideArray[ride_no] = updatedRide;
            this.setState({ accepted_ride_array: newAcceptedRideArray });
            }
            catch(er){
                console.log(er);
            }
        
        
        
       
     
    }
   
    constructor(props) {
        super(props)
        this.state = { account: '',
        accepted_ride_array:[],
        list_ride_array:[],
        web3: null
     }
    }
    
    
    render() {
       const {accepted_ride_array} = this.state;
            return (
                <>
                <h3>Pending payments</h3>
                 <div className="card-deck">
                        {accepted_ride_array.map((item, index) => (
                            <div className="card" key={index}>
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">From address: {item.from_address}</p>
                                    <p className="card-text">To address: {item.to_address}</p>
                                    <p className="card-text"> Name: {item.name}</p>
                                    <p className="card-text">Date: {item.date}</p>
                                    <p className="card-text">Time: {item.time}</p>
                                    <p className="card-text">Driver name: {item.driver_name}</p>
                                    <p className="card-text">Price: {item.price}</p>
                                    <button type="button" class="btn btn-success" onClick={() => this.payRide( index )}>Pay</button>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            );
        }
        
    
}


export default App;