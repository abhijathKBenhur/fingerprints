import React from 'react';
import { Image, Button, Row, Col, Form, Container } from "react-bootstrap";
import {
    useParams
  } from "react-router-dom";
  import { useHistory } from 'react-router-dom';

const NFT = () => {
    let history = useHistory();
    function gotoGallery(){
        history.push('/home')
    }

    function buyToken(){
        gotoGallery()
    }

    let { id } = useParams();
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
                                        testing name
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        Category :
                                    </Col>
                                    <Col md={10}>
                                        caftefory12
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        Description :
                                    </Col>
                                    <Col md={10}>
                                        testing dwescription
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        Cost :
                                    </Col>
                                    <Col md={10}>
                                        2 ETH
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        Units in stock
                                    </Col>
                                    <Col md={10}>
                                        15
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Button variant="dark" onClick={()=> gotoGallery()}>
                                    Back
                                </Button>
                                <Button variant="danger" value="Submit" onClick={()=> buyToken()}>
                                    Buy
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default NFT;