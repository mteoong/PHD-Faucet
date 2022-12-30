import React, {Component} from 'react';
import './Home.css';
import {checkStatus, fixValues} from './Backend';

class Home extends Component {
  state = {
    balance: 0
  }

  componentDidMount() {
    const mintButton = document.getElementsByClassName('mint')[0];
    const burnButton = document.getElementsByClassName('burn')[0];
    const connectButton = document.getElementsByClassName('connect')[0];
    const amount = Number(document.getElementsByClassName("amount")[0].value) * (10 ** 6);

    const wallet = document.getElementsByClassName("wallet")[0];
    const balance = document.getElementsByClassName("balance")[0];
    const circulation = document.getElementsByClassName("circulation")[0];

    fixValues(wallet, balance, circulation);
    checkStatus(mintButton, burnButton, connectButton, amount, wallet, balance, circulation);
  }

  handleChange = (event) => {
    const mintButton = document.getElementsByClassName('mint')[0];
    const burnButton = document.getElementsByClassName('burn')[0];
    const connectButton = document.getElementsByClassName('connect')[0];
    const amount = Number(document.getElementsByClassName("amount")[0].value) * (10 ** 6);

    const wallet = document.getElementsByClassName("wallet")[0];
    const balance = document.getElementsByClassName("balance")[0];
    const circulation = document.getElementsByClassName("circulation")[0];

    checkStatus(mintButton, burnButton, connectButton, amount, wallet, balance, circulation);
    this.setState({state: event.target.value});
  }

  render() {
    return (
      <div className="main-card">
        <div className="connect" onClick={this.changeVisibility}> Connect Wallet </div>
        <div className="title">
            <h1> PHD Faucet </h1>
            <h3> A wallet can mint once per day (10 PHD max). </h3>
        </div>
        <div className="top-div">
          <div className="wallet"> Wallet: Not Connected </div>
          <div className="balance"> Balance: ~ PHD</div>
        </div>
        <div className="bottom-div">
          <div className="circulation"> Total Supply: ~ PHD</div>
          <div className="right-div">
            <input className="amount" type="text" onChange={this.handleChange} contentEditable="true" defaultValue="10"></input>
            <div className="buttons">
                <div className="mint"> mint </div>
                <div className="burn"> burn </div>
            </div>
          </div>
        </div>
        <h4> PHD Address: 0x2F8A361a8CEe32B5b998DC1c3BCa5a5079A37Ec7 </h4>
        <h4 id="error"> *Error: This wallet already minted today! </h4>
      </div>
    );
  }
}

export default Home;