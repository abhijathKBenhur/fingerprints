


import BlockchainInterface from './interface/BlockchainInterface'

import React, { Component } from 'react';
import './App.scss';
import ipfs from './config/ipfs'

import NFTCard from './screens/NFTCard/NFTCard'
import Gallery from './screens/gallery/gallery'
import Header from './components/header/header'
import { Container, Row, Col } from "react-bootstrap";
import {  Switch, Route } from "react-router-dom";

class App extends Component {
  async componentWillMount() {
    window.ipfs = ipfs;
    window.BlockchainInterface = BlockchainInterface
    BlockchainInterface.initialize().then(tokens => {
      this.setState({
        tokens
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      tokens :[]
    }
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(form) {
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(form.file);
    reader.onloadend = () => {
      window.ipfs.files.add(Buffer(reader.result), (error, result) => {
        if(error) {
          console.error(error)
          return;
        }
        form.file = result[0].path
        this.BlockchainInterface.createToken({options:form})
      })
    }
  }

  render() {
    return (
        <div className="appContainer">
          <Header submitForm={this.onSubmit}></Header>
          <Container fluid className="cardSection p-5">
            <Switch>
              <Route
                path='/home'
                render={(props) => (
                  <Gallery fingerprints={this.state.tokens} {...props} />
                )}
              />
              <Route path="/card/:id" children={<NFTCard />} />
              <Route>{'404'}</Route>
            </Switch>
          </Container>
        </div>
    );
  }
}

export default App;
