import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Container } from "react-bootstrap";
import MongoDBInterface from '../../interface/MongoDBInterface';
import { confirm } from "../../modals/confirmation/confirmation"
import SocialShare from '../../modals/social-share/socialShare'
import { useParams,useLocation } from "react-router-dom";
import {  toast } from 'react-toastify';

import { useHistory } from 'react-router-dom';
import _ from 'lodash'

import { Share2, ShoppingCart, Feather, User, AlignLeft } from 'react-feather';
import './NFTCard.scss'
import 'react-toastify/dist/ReactToastify.css';

const NFT = (props) => {
    let history = useHistory();
    const [token, setToken] = useState({});
    const [showShareModal, setShowShareModal] = useState(false);
    const location = useLocation()
    let referrer  = new URLSearchParams(location.search).get("referrer");
    

    useEffect(() => {
       
        MongoDBInterface.getTokenById(id).then(token => {
            setToken(_.get(token,'data.data'));
        })
    }, []); // call the method once

    let { id } = useParams();
    
    function copyURL(){
        setShowShareModal(true)
       
    }

     function buyToken() {
        confirm("This transaction will cost you "+ token.price+" ETH","Are your sure to Buy this token").then(success => {
            if(success){
                let buyerAccount = localStorage.getItem("userInfo")
                let seller = token.type == "Licence" ? token.account : token.owner
                MongoDBInterface.buyToken({buyer: buyerAccount, seller:seller,...token, }).then(tokenResponse => {
                    setToken(_.get(tokenResponse,'data.data'))
                    MongoDBInterface.buyUserToken({buyer: buyerAccount,seller,referrer:referrer,..._.get(tokenResponse,'data.data')}).then(success => {
                        toast.dark('Token has been added to your collection!', {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                })
            }else{

            }
          }) 
    }
    return (
        <Container className="cardView">
            <SocialShare
                show={showShareModal}
                onHide={() => setShowShareModal(false)}
                ></SocialShare>
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
                                <ShoppingCart onClick={buyToken}></ShoppingCart>
                                :
                                <Share2 onClick={()=> copyURL()}></Share2> 
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