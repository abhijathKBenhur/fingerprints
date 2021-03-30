import React from 'react';
import { Card, CardDeck, Image } from "react-bootstrap";

const TopPicks = () => {

    return (
        <div  className="mt-4">
            <h3>Trending</h3>
            <CardDeck>
                {[1,2,3,4,5,6].map(number => {
                    return (<Card>
                        <Card.Img variant="top" src={"https://source.unsplash.com/random/200x200?sig="+number} />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                )})}
                
                </CardDeck>
        </div>
    );
};

export default TopPicks;