
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Container, Jumbotron, Row, Col, Modal } from 'react-bootstrap';

const ModalInformation = props => {

        switch (props.type) {
        case 'description':
        return (
            <Jumbotron>
            <h1>Descrição do curso de <span>{props.show.name}</span></h1>
            <p>{props.value}</p>
            <p>
              <Button variant="primary" onClick={() => props.handleClick(false)}>Voltar </Button>
            </p>
          </Jumbotron>
        )
        default:
            return (
                <Jumbotron>
                <h1>Ops, Ocorreu um problema</h1>
                <p>
                  <Button variant="primary" onClick={() => props.handleClick(false)}>Voltar </Button>
                </p>
              </Jumbotron>
                )
        }
}
export default ModalInformation;