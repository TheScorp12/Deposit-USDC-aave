import './App.css';
import React from 'react';
import {useState} from 'react';
import Web3 from 'web3';
import sendamount from './sendamount';
const { ethers } = require("ethers");


function App() {
  let provider;
  const[address,setAddress] = useState('');
  const [formDetails, setFormDetails] = useState({ amount: 1 });
  const changeHandler = (event) => {
    let name = event.target.name;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };


  const detectCurrentProvider = () => {
    if (window.ethereum) {
      provider = window.ethereum;
      return provider;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
      return provider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        setAddress(userAccount[0]);
        //console.log(address);
      }
    } catch (err) {
      console.log(err);
    }
    return address;
  };
onConnect();
  const RequestHandler = async() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    sendamount(signer,formDetails.amount);
  }

  return (
    <div className="App">
      {       
        <div className='box'><div className="input-box">
        <span className="details">Amount (USDC) </span>
        <input
          onChange={changeHandler}
          name="amount"
          type="text"
          value={formDetails.amount}
          placeholder="Enter Amount to send"
          required
        />
      </div><button className="button" onClick={RequestHandler}>Send</button> </div>
      } </div>
  );
}

export default App;

