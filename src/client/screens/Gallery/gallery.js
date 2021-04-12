import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import cardCategories from '../../commons/Constants'
import Rack from '../../components/Rack/Rack'
function gallery(props) {
    return (
        <Row className="w-100">
            <Rack category={cardCategories.CONTEMPORARY} cards={props.fingerprints.filter(card => card.category == cardCategories.CONTEMPORARY)} ></Rack>
        </Row>
      
    )
}

export default gallery;