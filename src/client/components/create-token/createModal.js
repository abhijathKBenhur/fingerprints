import React, { Component, useState } from "react";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import   Dropzone from "react-dropzone";
import "./Modal.scss";


class AddTokenModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tokenName: '',
          tokenCategory: 'Graffiti',
          tokenDescription: '',
          tokenCost:0,
          tokenSupply: 1
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onDrop = (acceptedFiles) => {
          this.setState({files:Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          })})
        };
      }

      
    handleChange (event) {
      let name = event.target.name
      console.log("changing",name,event.target.value)
      this.setState({name: event.target.value});
    }


    handleSubmit (event) {
        let name = event.target.name
        event.preventDefault();
        console.log("submitting" , this.state)
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
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.tokenName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="tokenCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  className="my-1 mr-sm-2"
                  custom
                  onChange={this.handleChange}
                  value={this.state.tokenCategory}
                >
                  <option value="Graffiti">Graffiti</option>
                  <option value="Vectors">Vectors</option>
                  <option value="Doodles">Doodles</option>
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
                    name="description"
                    onChange={this.handleChange}
                    value={this.state.tokenDescription}
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
                        onChange={this.handleChange}
                        value={this.state.tokenCost}
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
                      onChange={this.handleChange}
                      value={this.state.tokenSupply}
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>
              </Form.Group>
            </Form.Group>
            <Form.Group as={Col} md="6" className="imageContainer">
              <Dropzone onDrop={this.onDrop}>
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
                {/* {file && (
                  <img
                    src={file.preview}
                    alt="preview"
                    className="droppedImage"
                  />
                )} */}
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={this.props.onHide}>
          Cancel
        </Button>
        <Button variant="danger" value="Submit" onClick={this.handleSubmit} >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
        );
    }
}

export default AddTokenModal;