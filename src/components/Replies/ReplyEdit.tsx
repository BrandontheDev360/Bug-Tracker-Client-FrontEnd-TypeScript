import React from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';


interface ReplyEditProps {
    replyUpdate: any
    sessionToken: any
    fetchReplies: any
    updateOff: any
}

interface ReplyEditStates {
    editReply: any
    editBugId: any
}

class ReplyEdit extends React.Component<ReplyEditProps, ReplyEditStates> {
    constructor(props: ReplyEditProps) {
        super(props)
        this.state = {
            editReply: this.props.replyUpdate.reply,
            editBugId: this.props.replyUpdate.bugId
        }
    }

    replyUpdate = (e: any): void => {
        e.preventDefault()
        fetch(`http://localhost:3009/reply/${this.props.replyUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                reply: {
                    reply: this.state.editReply,
                    bugId: this.state.editBugId
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        })
        .then((res) => {
            console.log(res)
            this.props.fetchReplies()
            this.props.updateOff()
            this.setState({
                editReply: '',
                editBugId: ''
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
                <Form onSubmit={this.replyUpdate}>
                    <FormGroup>
                        <Label htmlFor='reply'>Edit Reply:</Label>
                        <Input name='reply' value={this.state.editReply} onChange={(e) => this.setState({editReply: e.target.value})} placeholder='Reply' />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor='bugId'>Edit BugId:</Label>
                        <Input name='bugId' value={this.state.editBugId} onChange={(e) => this.setState({editBugId: e.target.value})} placeholder='BugId' />
                    </FormGroup>

                    <Button color="warning" type='submit'>Update Reply</Button>
                </Form>
        </ModalBody>
    </Modal>
    </>
        
        )
    }
}

export default ReplyEdit;