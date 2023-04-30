import React, { Component } from 'react'
import Web3 from 'web3'
import { ABI, contract } from './config.js'

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
    
    async registerDriver(){
        const {scontract} = this.state
        await scontract.methods.register_driver().send({from:this.state.account})
    }
    async registerCustomer(){
        const {scontract} = this.state
        try{
            await scontract.methods.register_customer().send({from:this.state.account})
        }
        catch(err){
            console.log(err);
        }
        
    }
   /* async setValue() {
        const {scontract,role} = this.state
        console.log(role);
        if(role==0)
        {
            await scontract.methods.register_customer().send({from:this.state.account})
        }
        else if(role==1)
        {
            await scontract.methods.register_driver().send({from:this.state.account})
        }
    
      }*/
    constructor(props) {
        super(props)
        this.state = { account: '',
    role:'', }
    }
    // role is 0 for customer 1 for driver
    handleInputChange = (event) => {
        this.setState({ role: event.target.value })
        
      }
    
    render() {
        return (<>
              <div className='container-sm' class="items-center flex justify-center h-screen">
                
                <p>Your account: {this.state.account}</p>
            </div>
            <div className='container-sm' class="items-center flex justify-center h-screen">
                <form>
                <div class="justify-center items center flex">
                    <h3 className='text-center'style={{margindown: '100px'}}>REGISTER</h3></div>
                    <div className='text-center'>
                    <button  className="btn btn-success "  onClick={() => this.registerCustomer()}style={{marginRight: '40px'}}>Register as Customer</button>
                    <button  className="btn btn-success" onClick={() => this.registerDriver()}>Register as Driver</button>
                    </div>
                   
                </form>

            </div>
        </>
        );
    }
}
/* 
 <select className="form-select" aria-label="Default select example" defaultValue={-1} onChange={this.handleInputChange}>
                    <option value="-1">Select a role</option>
                        <option value="0">Customer</option>
                        <option value="1">Driver</option>
                         <button  className="btn btn-success" onClick={() => this.registerDriver()}>Register as Driver</button>
                    </select>-->
*/

export default App;