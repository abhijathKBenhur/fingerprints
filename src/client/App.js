import BlockchainInterface from './interface/BlockchainInterface'
import MongoDBInterface from './interface/MongoDBInterface'
import _ from 'lodash'
import React, { Component } from 'react';
import './App.scss';

import NFTCard from './screens/NFTCard/NFTCard'
import Gallery from './screens/Gallery/gallery'
import Header from './components/header/header'
import { Container, Row, Col } from "react-bootstrap";
import {  Switch, Route } from "react-router-dom";

class App extends Component {

  refreshTokens(){
    MongoDBInterface.getTokens().then(tokens =>{
      this.setState({
            tokens: _.get(tokens,'data.data')
          })
      })

    // BlockchainInterface.initialize().then(tokens => {
    //   this.setState({
    //     tokens
    //   })
    // })
  }

  async componentWillMount() {
    this.refreshTokens()
  }

  constructor(props) {
    super(props)
    this.state = {
      tokens :[]
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  async submitLoginForm(data){
    let userInfo = _.get(data,'data.data.userName')
    debugger;
    if(data.login){
      console.log("logged in ", )
      localStorage.setItem("userInfo",userInfo)
    }else if(data.signup){
      localStorage.setItem("userInfo",userInfo)
    }
  }

  async onSubmit(form) {
    // BlockchainInterface.getFilePath(form.file).then(path => {
    //   form.file = path
    //   BlockchainInterface.createToken({options:form})
    // })
    MongoDBInterface.getFilePath(form.uri).then(filePath => {
      form.uri = filePath.data.data;
      MongoDBInterface.addToken(form).then(success => {
        this.refreshTokens();
      })
    })
   
  }

  render() {
    return (
        <div className="appContainer">
          <Header submitForm={this.onSubmit} submitLoginForm={this.submitLoginForm}></Header>
          <Container fluid className="cardSection p-5">
            <Switch>
              <Route
                path='/home'
                render={(props) => (
                  <Gallery fingerprints={this.state.tokens} {...props} />
                )}
              />
              <Route path="/card/:id" children={<NFTCard />} />
            </Switch>
          </Container>
        </div>
    );
  }
}

export default App;
