import React from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';


interface BugEditProps {
    bugUpdate: any
    sessionToken: any
    fetchBugs: any
    updateOff: any
}

interface BugEditState  {
    editTitle: any
    editDescription: any
    editPriority: any
}

class BugEdit extends React.Component<BugEditProps, BugEditState> {
    constructor(props: BugEditProps) {
        super(props)
        this.state = {
            editTitle: this.props.bugUpdate.title,
            editDescription: this.props.bugUpdate.description,
            editPriority: this.props.bugUpdate.priority
        }
    }

    bugUpdate = (e: any): void => {
        e.preventDefault()
        fetch(`http://localhost:3009/bug/${this.props.bugUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                bug: {
                    title: this.state.editTitle,
                    description: this.state.editDescription,
                    priority: this.state.editPriority
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        })
        .then((res) => {
            console.log(res)
            this.props.fetchBugs()
            this.props.updateOff()
            this.setState({
                editTitle: '',
                editDescription: '',
                editPriority: ''
            })
        })
        .catch(err => console.log(err))
    } 

    leaveModal = () => {
        this.props.updateOff();
    }

    render() {
        return(
            <>
            <Modal isOpen={true}>
                <ModalHeader>
                    <Row md="12">
                        <Col md='auto'>
                            Update Bug
                        </Col>
                        <Col md='auto'>
                            <Button outline color="warning" onClick={this.leaveModal} className="exit">X</Button>
                        </Col>
                    </Row>
                </ModalHeader>
            <ModalBody>
                <Form onSubmit={this.bugUpdate}>
                    <FormGroup>
                        <Label htmlFor='title'>Edit Title:</Label>
                        <Input name='title' value={this.state.editTitle} onChange={(e) => this.setState({editTitle: e.target.value})} placeholder='Title' />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor='priority'>Edit Priority:</Label>
                        <Input name='priority' value={this.state.editPriority} onChange={(e) => this.setState({editPriority: e.target.value})} placeholder='Priority' />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor='description'>Edit Description:</Label>
                        <Input name='description' value={this.state.editDescription} onChange={(e) => this.setState({editDescription: e.target.value})} placeholder='Description' />
                    </FormGroup>

                    <Button color="warning" type='submit'>Update Bug Ticket</Button>
                </Form>
        </ModalBody>
    </Modal>
    </>
        )
    }
}

export default BugEdit