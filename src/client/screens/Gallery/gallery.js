import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import cardCategories from '../../commons/Constants'
import Rack from '../../components/Rack/Rack'
import './gallery.scss'
function gallery(props) {
    return (
        <div className="gallery">
            <Row className="w-100">
                <Rack category={cardCategories.CONTEMPORARY} cards={props.fingerprints.filter(card => card.category == cardCategories.CONTEMPORARY)} ></Rack>
            </Row>
            <Row className="w-100">
                <Rack category={cardCategories.MORDERN} cards={props.fingerprints.filter(card => card.category == cardCategories.MORDERN)} ></Rack>
            </Row>
            <Row className="w-100">
                <Rack category={cardCategories.ABSTRACT} cards={props.fingerprints.filter(card => card.category == cardCategories.ABSTRACT)} ></Rack>
            </Row>
        </div>
      
    )
}

export default gallery;