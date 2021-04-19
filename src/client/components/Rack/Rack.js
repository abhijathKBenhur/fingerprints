import React from 'react';
import { Card, CardDeck, Image } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
const Rack = (props) => {
    let history = useHistory();
    function openCardView(id){
        history.push('/card/'+ id)
    }

    return (
        <div  className="mt-4">
            <h3>{props.category}</h3>
            <CardDeck>
                {props.cards.map((fingerprint,index) => {
                    return (
                    <Card key={index} onClick={() =>{
                         openCardView(fingerprint._id)
                    }}>
                        <Card.Img variant="top" src={"https://source.unsplash.com/random/200x200?sig="+2} />
                        <Card.Body>
                            <Card.Title>{fingerprint.title}</Card.Title>
                            <Card.Text>
                                {fingerprint.category}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            {/* <small className="text-muted">{fingerprint.supply} In supply</small> */}
                            <small className="text-muted">{fingerprint.price} ETH</small>
                        </Card.Footer>
                    </Card>
                )})}
                
                </CardDeck>
        </div>
    );
};
export default Rack;