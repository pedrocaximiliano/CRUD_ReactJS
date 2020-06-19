
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Modal } from 'react-bootstrap';

const ModalError = props => {


    console.log('ccc', props)

    const [show, setShow] = useState(true);

        switch (props.value) {
        case 'Incomplet Form':
        return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Ops, Ocorreu um Erro</Modal.Title>
            </Modal.Header>
            <Modal.Body>Preencha todas as informações</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.handleClick(false)}>
                Fechar
                </Button>
            </Modal.Footer>
        </Modal>
        )
        case 'Internal error':
            return (
                <Modal show={show}>
                    <Modal.Header>
                        <Modal.Title>Data já Cadastrada</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Já existe curso para essa data</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => props.handleClick(false)}>
                        Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
                )
        default:
            return (
                <Modal show={show}>
                    <Modal.Header>
                        <Modal.Title>Ops, Ocorreu um problema</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Verifique os dados e tente novamente</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => props.handleClick(false)}>
                        Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
                )
        }
}
export default ModalError;