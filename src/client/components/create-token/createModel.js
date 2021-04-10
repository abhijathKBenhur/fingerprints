import React, { Component, useState } from "react";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import Dropzone from "react-dropzone";
import cardCategories from '../../../client/commons/Constants'
import "./Modal.scss";
import _ from 'lodash'
class AddTokenModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenName: "",
      tokenCategory: _.values(cardCategories)[0],
      tokenDescription: "",
      tokenCost: 0,
      tokenSupply: 1,
      file: undefined,
      callback: props.onSubmit
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.onDrop = (acceptedFiles) => {
      this.setState({
        file: Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      });
    };
  }

  handleChange(event) {
    var stateObject = function() {
      let returnObj = {};
      returnObj[this.target.name] = this.target.value;
         return returnObj;
    }.bind(event)();
    this.setState(stateObject)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onHide()
    this.state.callback(this.state)
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Token
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form noValidate onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6">
              <Form.Group as={Col} md="12" controlId="tokenName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="tokenName"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="tokenCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  className="my-1 mr-sm-2"
                  custom
                  name="tokenCategory"
                  onChange={this.handleChange}
                >
                  {
                    _.values(cardCategories).map(category => {
                      return <option key={category} value={category}>{category}</option>
                    })
                  }
                </Form.Control>

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="tokenDescription">
                <Form.Label>Description</Form.Label>
                <InputGroup hasValidation size="lg">
                  <Form.Control
                    type="textarea"
                    placeholder="Description"
                    aria-describedby="inputGroupAppend"
                    name="tokenDescription"
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="tokenCost">
                <Form.Row>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Cost</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder="0.0"
                        min={1}
                        aria-label="Amount (ether)"
                        name="tokenCost"
                        onChange={this.handleChange}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>ETH</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="tokenSupply">
                    <Form.Label>Total Suply</Form.Label>
                    <Form.Control
                      type="number"
                      className="my-1 mr-sm-2"
                      name="tokenSupply"
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>
              </Form.Group>
            </Form.Group>
            <Form.Group as={Col} md="6" className="imageContainer">
              <Dropzone onDrop={this.onDrop}  acceptedFiles={".jpeg"} className="dropzoneContainer">
                  {({getRootProps, getInputProps}) => (
                    <section className="container">
                      {!this.state.file && (
                        <div {...getRootProps()} className="dropZone h-100">
                          <input {...getInputProps()} />
                          <p>Drop files here</p>
                        </div>
                      )}
                    </section>
                  )}
                </Dropzone>
                {this.state.file && (
                  <img
                    src={this.state.file.preview}
                    alt="preview"
                    className="droppedImage"
                    style={{width:'90%'}}
                  />
                )}
            </Form.Group>
          </Form.Row>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={this.props.onHide}>
            Cancel
          </Button>
          <Button variant="danger" value="Submit" onClick={this.handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddTokenModal;
