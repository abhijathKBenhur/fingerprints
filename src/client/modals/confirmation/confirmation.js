import React from "react";
import PropTypes from "prop-types";
import './confirmation.scss'
import {Modal, Button } from "react-bootstrap";
import { confirmable, createConfirmation } from "react-confirm";

class Confirmation extends React.Component {
  render() {
    const {
      proceedLabel,
      cancelLabel,
      title,
      confirmation,
      show,
      proceed,
      enableEscape = true
    } = this.props;
    return (
      <div className="static-modal">
        <Modal
          dialogClassName="confirmationModal"
          show={show}
          onHide={() => proceed(false)}
          backdrop={enableEscape ? true : "static"}
          keyboard={enableEscape}
        >
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{confirmation}</Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={() => proceed(false)}>{cancelLabel}</Button>
            <Button variant="danger"
              className="button-l"
              bsStyle="primary"
              onClick={() => proceed(true)}
            >
              {proceedLabel}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Confirmation.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func, // called when ok button is clicked.
  enableEscape: PropTypes.bool
};

export function confirm(
  confirmation,
  title,
  proceedLabel = "OK",
  cancelLabel = "cancel",
  options = {}
) {
  return createConfirmation(confirmable(Confirmation))({
    confirmation,
    title,
    proceedLabel,
    cancelLabel,
    ...options
  });
}
