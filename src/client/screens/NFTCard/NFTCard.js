import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Container } from "react-bootstrap";
import MongoDBInterface from '../../interface/MongoDBInterface';
import { confirm } from "../../modals/confirmation/confirmation"

import {
    useParams
  } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import _ from 'lodash'
import { Share2, ShoppingCart, Feather, User, AlignLeft } from 'react-feather';
import './NFTCard.scss'


const NFT = () => {
    let history = useHistory();
    const [token, setToken] = useState({});

    useEffect(() => {
        MongoDBInterface.getTokenById(id).then(token => {
            setToken(_.get(token,'data.data'));
        })
    }, []); // call the method once


    let { id } = useParams();
    

    function buyToken(){
        if (confirm("Are your sure?","Buy Token")) {
            let buyerAccount = localStorage.getItem("userInfo")
            MongoDBInterface.buyToken({buyer: buyerAccount,...token}).then(token => {
                setToken(_.get(token,'data.data'))
                MongoDBInterface.buyUserToken({buyer: buyerAccount,..._.get(token,'data.data')})
            })
          } else {
            console.log("cancelled buy")
          }
    }

    return (
        <Container className="cardView">
            <Row>
                <Col md="3"></Col>
                <Col md="5">
                    <Card className="">
                        <Card.Footer>
                            <div className="d-flex justify-content-between">
                                <small className="text-muted">{token.price} ETH</small>
                                <div>
                                {
                                token.owner != localStorage.getItem("userInfo") ? 
                                    <Share2></Share2>
                                    : 
                                    <ShoppingCart onClick={()=> buyToken()}></ShoppingCart>
                                }
                                </div>
                            </div>
                        </Card.Footer>
                        <Card.Img variant="top" src={token.uri} />
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <Card.Title>{token.name}</Card.Title>
                                <Card.Text  className="d-flex align-items-center">
                                    {token.owner}
                                    <Feather size={15} className="ml-2"></Feather>
                                </Card.Text>
                            </div>
                           
                            <div className="d-flex justify-content-between">
                                <Card.Text>
                                    {token.category}
                                </Card.Text>
                                <Card.Text  className="d-flex align-items-center">
                                    {token.account}
                                    <User size={15} className="ml-2"></User>
                                </Card.Text>
                            </div>
                            
                        </Card.Body>
                        <Card.Footer>
                             {token.description}    
                        </Card.Footer>
                    </Card>
                </Col>
                
            </Row>
        </Container>
    );
};

export default NFT;