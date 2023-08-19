// src/components/Login.js
import React from 'react';
import Web3 from 'web3';

class Login extends React.Component {
  connectMetamask = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        this.props.onLogin(accounts[0]);
      } catch (error) {
        console.error("User rejected the request");
      }
    } else {
      console.log('Metamask is not installed');
    }
  };

  render() {
    return (
      <button onClick={this.connectMetamask}>
        Login with Metamask
      </button>
    );
  }
}

export default Login;
