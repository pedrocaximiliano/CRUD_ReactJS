
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Container, Jumbotron, Row, Col, Modal, Alert } from 'react-bootstrap';

const ModalInformation = props => {

        switch (props.type) {
        case 'description':
        return (
            <Jumbotron>
            <h1 style={{fontSize:24, fontWeight: 'bold'}}>Descrição do curso de <span>{props.show.name}</span></h1>
            <p>{props.value}</p>
            <p>
              <Button variant="primary" onClick={() => props.handleClick(false)}>Voltar </Button>
            </p>
          </Jumbotron>
        ) 
        case 'delete': 
        return (
          <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Atenção</Modal.Title>
            </Modal.Header>
            <Modal.Body>Gostaria de deletar o curso de <span>{props.show.name}</span></Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => props.handleClick(true)}>
                deletar
                </Button>
                <Button variant="secondary" onClick={() => props.handleClick(false)}>
                cancelar
                </Button>
            </Modal.Footer>
        </Modal>
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