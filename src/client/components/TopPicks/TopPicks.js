import React from 'react';
import { Card, CardDeck, Image } from "react-bootstrap";

const TopPicks = (props) => {

    return (
        <div  className="mt-4">
            <h3>{props.category}</h3>
            <CardDeck>
                {props.cards.map((fingerprint,index) => {
                    return (
                    <Card key={index}>
                        <Card.Img variant="top" src={"https://source.unsplash.com/random/200x200?sig="+2} />
                        <Card.Body>
                            <Card.Title>{fingerprint.title}</Card.Title>
                            <Card.Text>
                                {fingerprint.category}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            {/* <small className="text-muted">{fingerprint.supply} In supply</small> */}
                            <small className="text-muted">{fingerprint.cost} ETH</small>
                        </Card.Footer>
                    </Card>
                )})}
                
                </CardDeck>
        </div>
    );
};
export default TopPicks;