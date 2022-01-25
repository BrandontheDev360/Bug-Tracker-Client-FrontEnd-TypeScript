import React from 'react'
import { Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';

interface LoginProps {
    updateToken: any
}

interface LoginState {
    email: string
    password: string
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleLogin = (e: any): void => {
        e.preventDefault()
        fetch(`http://localhost:3009/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email: this.state.email,
                    password: this.state.password
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then<any, never>((res) => res.json())
        .then<void, never>((data) => {
            console.log(data)
            this.props.updateToken(data.sessionToken)
        })
        .catch(err => console.log(err))
    }

    render() {
    return (
        <>
            <Row>
                <h1>Bug Tracker</h1>
            </Row>
            <br/>
            <Row>
                <h3>Login</h3>
            </Row>
            <br/>
            <Row>
                <Form onSubmit={this.handleLogin}>
                    <FormGroup>
                        <Label htmlFor='email'>Email</Label>
                        <Input onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} type='email' name='email' placeholder='Email' required/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'>Password</Label>
                        <Input onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} type='password' name='password' placeholder='Password' required/>
                    </FormGroup>
                    <br />
                    <Button type='submit' outline color="warning" className="button">Login</Button>
                </Form>
            </Row>
        </>
    )
    }
}

export default Login