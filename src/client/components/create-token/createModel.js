import React, { Component, useState } from "react";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";
import "./Modal.scss";

let handleSubmit = (e) => {
  console.log(e);
};
export default function AddTokenModal(props) {
  const [file, setFile] = useState(undefined);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
      console.log(file);
    },
  });

  let handleChange = (e) => {
    console.log(e);
  };

  let values = {};
 
  return (
    <Modal
      {...props}
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
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6">
              <Form.Group as={Col} md="12" controlId="createTokenName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="createTokenCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  className="my-1 mr-sm-2"
                  custom
                  value={values.category}
                >
                  <option value="Graffiti">Artworks</option>
                  <option value="Vectors">Vectors</option>
                  <option value="Doodles">Doodles</option>
                </Form.Control>

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="createTokenDescription">
                <Form.Label>Description</Form.Label>
                <InputGroup hasValidation size="lg">
                  <Form.Control
                    type="textarea"
                    placeholder="Description"
                    aria-describedby="inputGroupAppend"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="createTokenCost">
                <Form.Row>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Cost</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder="0.0"
                        value={values.cost}
                        min={1}
                        aria-label="Amount (ether)"
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>ETH</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="createTokenCost">
                    <Form.Label>Total Suply</Form.Label>
                    <Form.Control
                      type="number"
                      value={values.totalsupply}
                      className="my-1 mr-sm-2"
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>
              </Form.Group>
            </Form.Group>
            <Form.Group as={Col} md="6" className="imageContainer">
              {!file && (
                <div {...getRootProps()} className="dropZone h-100">
                  <input {...getInputProps()} />
                  <p>Drop files here</p>
                </div>
              )}

              {file && (
                <img
                  src={file.preview}
                  alt="preview"
                  className="droppedImage"
                />
              )}
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() =>{
          console.log("etst")
        }}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
