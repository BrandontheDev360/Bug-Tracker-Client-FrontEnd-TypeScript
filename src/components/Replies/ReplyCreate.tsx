import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

interface ReplyCreateProps {
    sessionToken: string
    fetchReplies: any
    replyUpdate: any
}

interface ReplyCreateState {
    reply: string
    bugId: string
}

class ReplyCreate extends React.Component<ReplyCreateProps, ReplyCreateState> {
    constructor(props: ReplyCreateProps) {
        super(props)
        this.state = {
            reply: '',
            bugId: ''
        }
    }

    handleReplyCreate = (e: any): void => {
        e.preventDefault()
        fetch('http://localhost:3009/reply/create', {
            method: 'POST',
            body: JSON.stringify({
                reply: {
                    reply: this.state.reply,
                    bugId: this.state.bugId
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        })
        .then((res) => {
            console.log(res)
            res.json()
        })
        .then(() => {
            this.props.fetchReplies()
        })
        .catch(err => console.log(err))
    }

    render() {
        return(
            <>
            <h1>Create A Reply</h1>
                <Form onSubmit={this.handleReplyCreate}>
                    <FormGroup>
                        <Label></Label>
                        <p>Reply:</p>
                        <Input name = 'title' value = {this.state.reply} onChange={(e) => this.setState({reply: e.target.value})} placeholder = 'Reply' required></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label></Label>
                        <p>Bug Id:</p>
                        <Input name = 'Bug Id' value = {this.state.bugId} onChange={(e) => this.setState({bugId: e.target.value})} placeholder = 'Bug Id' required></Input>
                    </FormGroup>

                    <Button outline color="warning" type="submit">Reply</Button>
                </Form>
            </>
        )
    }
}

export default ReplyCreate;