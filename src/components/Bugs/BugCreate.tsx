import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Bugs.css'

interface BugCreateProps {
    sessionToken: any
    fetchBugs: any
}

interface BugCreateState {
    title: string
    description: string
    priority: string
}

class BugCreate extends React.Component<BugCreateProps, BugCreateState> {
    constructor(props: BugCreateProps) {
        super(props)
        this.state = {
            title: '',
            description: '',
            priority: ''
        }
    }

    handleBugCreate = (e: any): void => {
        e.preventDefault()
        fetch(`http://localhost:3009/bug/create`, {
            method: 'POST',
            body: JSON.stringify({
                bug: {
                    title: this.state.title,
                    description: this.state.description,
                    priority: this.state.priority
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then<any, never>((res) => {
            console.log(res)
            res.json()
        }
        ).then<void, never>(() => {
            this.setState({
                title: '',
                description: '',
                priority: ''
            })
            this.props.fetchBugs()
        })
        .catch<void>(err => console.log(err))
    }

    render() {
        return(
            <>
            <h1>Create A Bug Ticket</h1>
                <Form onSubmit={this.handleBugCreate}>
                    <FormGroup>
                        <Label></Label>
                        <p>Title:</p>
                        <Input name = 'title' value = {this.state.title} onChange={(e) => this.setState({title: e.target.value})} placeholder = 'Title' required></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label></Label>
                        <p>Description:</p>
                        <Input name = 'description' value = {this.state.description} onChange={(e) => this.setState({description: e.target.value})} placeholder = 'Description' required></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label></Label>
                        <p>Priority:</p>
                        <Input name = 'priority' value = {this.state.priority} onChange={(e) => this.setState({priority: e.target.value})} placeholder = 'Priority: Low, Medium, High' required></Input>
                    </FormGroup>
                    <br />
                    <Button outline color="warning" type="submit">Submit Bug</Button>
                </Form>
            </>
        )
    }
}

export default BugCreate