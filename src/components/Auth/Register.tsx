import React from 'react';
import { Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';

interface RegisterProps {
    updateToken: any
}

interface RegisterState {
    firstName: string
    lastName: string
    email: string
    password: string
}

class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }


    handleRegister = (e: any): void => {
        e.preventDefault()
        fetch(`http://localhost:3009/user/register`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then<any, never>(
            (res) => res.json()
        ).then<void, never>((data) => {
            console.log(data)
            this.props.updateToken(data.sessionToken)
        })
        .catch<void>(err => console.log(err))
    }

    render() {
    return (
        <>
            <Row>
                <h1>Bug Tracker</h1>
            </Row>

            <Row>
                <h3>Register An Account</h3>
            </Row>

            <Row>
                <Form onSubmit={this.handleRegister} >
                    <FormGroup>
                        <Label htmlFor='firstname'>First Name</Label>
                        <Input onChange={(e) => this.setState({firstName: e.target.value})} value={this.state.firstName} type='text' name='firstname' placeholder='First Name' required/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor='lastname'>Last Name</Label>
                        <Input onChange={(e) => this.setState({lastName: e.target.value})} value={this.state.lastName} type='text' name='lastname' placeholder='Last Name' required/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor='email'>Email</Label>
                        <Input onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} type='email' name='email' placeholder='Email' required/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor='password'>Password</Label>
                        <Input onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} type='password' name='password' placeholder='Password' required/>
                    </FormGroup>
                    <br />
                        <Button type='submit' className='button' outline color="warning">Register</Button>
                </Form>
            </Row>
        </>
    )}
}

export default Register