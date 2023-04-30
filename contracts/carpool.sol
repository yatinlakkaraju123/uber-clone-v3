// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract carpool{

   
    struct Customer{
        address user;
        bool  isRegistered;
    }
    struct Driver{
        address payable user;
        bool isRegistered;
    }
    // struct for request ride
    struct Ride{
        string from_address;
        string to_address;
         string name;
         string time;
         
         string date;
         address customer;
         bool isAccepted;
        
    }
    struct Accept_Ride{
        string from_address;
        string to_address;
         string name;
         string time;
         string driver_name;
         string date;
         address customer;
         address payable driver;
         uint price; 
         bool isPayed; 
    }
    mapping(address=>Customer) customers;
    mapping(address =>Driver) drivers;
    Customer[] public customer_array;
    Driver[] public  driver_array;
    Ride[] public ride_array;
    Accept_Ride[] public accept_ride_array;
    function register_customer() public {
       //bool not_registered = true;
        address current_user = msg.sender;
        require(!customers[msg.sender].isRegistered, "User is already registered as a customer");
        require(!drivers[msg.sender].isRegistered, "User is already registered as a driver");
        customers[msg.sender].isRegistered = true;
      //  require(not_registered==true);
        customer_array.push(Customer({
            user:current_user,
            isRegistered: true
        }));
        
    }
    receive() external payable {}
    function register_driver() public {
       // bool not_registered = true;
        address payable current_user = payable(msg.sender);
       
    
        require(!drivers[msg.sender].isRegistered, "User is already registered as a driver");
         require(!customers[msg.sender].isRegistered, "User is already registered as a customer");
        drivers[msg.sender].isRegistered = true; 
        driver_array.push(Driver({
            user:current_user,
            isRegistered: true
        }));
       
    }
    function request_ride(string calldata _from_address,string calldata _to_address,string calldata _name,string calldata _time,string calldata _date) public{
        /*bool existing_customer = false;
        for(uint i=0;i<customer_array.length;i++)
        {
            if(customer_array[i].user==msg.sender)
                existing_customer = true;
        }
        require(existing_customer==true);*/
       require(customers[msg.sender].isRegistered, "User is not  registered as a customer");
        ride_array.push(Ride({
            from_address:_from_address,
            to_address: _to_address,
            name: _name,
            time:_time,
            customer: msg.sender,
            date: _date,
            isAccepted:false
        }));
    }
    function get_customer_array() public view returns (Customer[] memory)
    {
        return customer_array;
    }
    function get_driver_array() public view returns (Driver[] memory)
    {
        return driver_array;
    }
    function get_ride_array() public view returns (Ride[] memory){
        return ride_array;
    }
    function get_accept_ride_array() public view returns (Accept_Ride[] memory){
        return accept_ride_array;
    }
    function accept_ride(uint  ride_no,string calldata dri_name,uint _price) public  {
        /* bool existing_driver = false;
        for(uint i=0;i<driver_array.length;i++)
        {
            if(driver_array[i].user==msg.sender)
                existing_driver = true;
        }*/
         require(drivers[msg.sender].isRegistered, "User is not registered as a driver");
        //require(existing_driver==true);
        accept_ride_array.push(Accept_Ride({
            from_address:ride_array[ride_no].from_address,
            to_address: ride_array[ride_no].to_address,
            name: ride_array[ride_no].name,
            time:ride_array[ride_no].time,
            driver_name: dri_name,
            customer: ride_array[ride_no].customer,
            driver: payable(msg.sender),
            price:_price,
            date: ride_array[ride_no].date,
            isPayed: false
        }));
        ride_array[ride_no].isAccepted = true;

    }
     // Function to receive Ether. msg.data must be empty
    /*receive() external payable {}
    // Fallback function is called when msg.data is not empty
    fallback() external payable {}*/
    function pay_driver(uint ride_no) public payable{
         require(customers[msg.sender].isRegistered, "User is not  registered as a customer");

        Accept_Ride storage ride = accept_ride_array[ride_no];
    address payable driver = ride.driver;
    require(accept_ride_array[ride_no].isPayed==false);
    //uint price = ride.price;
    //driver.transfer(price);
     (bool sent, bytes memory data) = driver.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        accept_ride_array[ride_no].isPayed=true;
    }
}