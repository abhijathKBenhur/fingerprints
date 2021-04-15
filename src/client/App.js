import BlockchainInterface from './interface/BlockchainInterface'

import React, { Component } from 'react';
import './App.scss';

import NFTCard from './screens/NFTCard/NFTCard'
import Gallery from './screens/gallery/gallery'
import Header from './components/header/header'
import { Container, Row, Col } from "react-bootstrap";
import {  Switch, Route } from "react-router-dom";

class App extends Component {
  async componentWillMount() {
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


  async onSubmit(form) {
    BlockchainInterface.getFilePath(form.file).then(path => {
      form.file = path
      BlockchainInterface.createToken({options:form})
    })
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
