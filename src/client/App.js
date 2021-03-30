import React, { Component } from 'react';
import Web3 from 'web3'
import ipfs from './config/ipfs'

import './App.scss';
import Fingerprints from '../abis/Fingerprints.json'
import { Container, Row, Col } from "react-bootstrap";

// componenets import
import Header from './components/header/header'
// import TopPicks from './components/TopPicks/TopPicks'
// import Trending from './components/Trending/Trending'
class App extends Component {


  async componentWillMount() {
    window.Fingerprints = Fingerprints
    window.ipfs = ipfs;
    await this.loadWeb3()
    await this.loadBlockchainData()
    
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId()
    const networkData = window.Fingerprints.networks[networkId];
    if(networkData) {
      const abi = window.Fingerprints.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalTokens().call()
      const totalNumbers = totalSupply
      this.setState({ totalSupply })
      for (var i = 1; i <= totalSupply; i++) {
        const fingerprint = await contract.methods.metadataOf(i).call()
        this.setState({
          fingerprints: [...this.state.fingerprints, fingerprint]
        })
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (color) => {
    this.state.contract.methods.mint(color).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        colors: [...this.state.colors, color]
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      fingerprints: [],
    }
  }

  headerCallBack(action){
    switch(action){
      
    }
  }

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer:Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit(event) {
    window.ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error)
        return;
      }
      this.mint(result[0].path)
    })
  }

  render() {
    return (
      <div className="appContainer">
        <Header></Header>
        <Container fluid className="mt-4">
          <Row className="w-100">
             {
                this.state.fingerprints.map(fingerprint => {
                  return ( 
                    <div key={fingerprint[0]}>
                      <Col>{fingerprint[0]}</Col> 
                      <Col>{fingerprint[1]}</Col> 
                      <Col>{fingerprint[5]}</Col> 
                      <Col>{fingerprint[6]}</Col> 
                      <Col>{Number(window.web3.utils.fromWei(fingerprint[3].toString(), 'ether')).toFixed(2)} ETH</Col> 
                    </div>
                  )
                })
              }
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;