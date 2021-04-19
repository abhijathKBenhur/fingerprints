import React, { useState, useEffect } from 'react';
import { Image, Button, Row, Col, Form, Container } from "react-bootstrap";
import MongoDBInterface from '../../interface/MongoDBInterface';
import {
    useParams
  } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import _ from 'lodash'

const NFT = () => {
    let history = useHistory();
    const [token, setToken] = useState({});

    useEffect(() => {
        MongoDBInterface.getTokenById(id).then(token => {
            setToken(_.get(token,'data.data'));
        })
    }, []); // call the method once


    let { id } = useParams();
    function gotoGallery(){
        history.push('/home')
    }

    function buyToken(){
        let buyerAccount = localStorage.getItem("userInfo")
        MongoDBInterface.buyToken({buyer: buyerAccount,...token}).then(token => {
            setToken(_.get(token,'data.data'))
            MongoDBInterface.buyUserToken({buyer: buyerAccount,..._.get(token,'data.data')})
        })
    }

    return (
        <Container fluid >
            <Row>
                <Col md="4">
                    <Image src={"https://source.unsplash.com/random/500x500?sig="+2} fluid />
                </Col>
                <Col md="8" className="imageContainer">
                    <Col md={12}>
                        <Row>
                            <Col md={12}>
                                <Row>
                                    <Col md={2}>
                                        Name :
                                    </Col>
                                    <Col md={10}>
                                        {token.name}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        Owner :
                                    </Col>
                                    <Col md={10}>
                                        {token.owner}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        Category :
                                    </Col>
                                    <Col md={10}>
                                        {token.category}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        Description :
                                    </Col>
                                    <Col md={10}>
                                        {token.description}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        Cost :
                                    </Col>
                                    <Col md={10}>
                                        {token.price}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        Units in stock
                                    </Col>
                                    <Col md={10}>
                                        {token.amount}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Button variant="dark" onClick={()=> gotoGallery()}>
                                    Back
                                </Button>
                                {
                                token.owner != localStorage.getItem("userInfo") ? 
                                    <Button variant="danger" value="Submit" onClick={()=> buyToken()}>
                                    Buy
                                    </Button> : ""
                                }
                                
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default NFT;