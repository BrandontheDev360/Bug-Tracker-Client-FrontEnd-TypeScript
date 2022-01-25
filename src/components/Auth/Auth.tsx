import React from 'react'
import { Container, Row, Col, Button } from "reactstrap"
import Register from './Register'
import Login from './Login'
import "./Auth.css"

interface AnyProps {
    updateToken: object | null | undefined
}

interface ToggleState {
    toggle: boolean,
    loginOrRegister: string 
}

class Auth extends React.Component< AnyProps, ToggleState > {
    constructor(props: AnyProps) {
        super(props)
        this.state = {
            toggle: true,
            loginOrRegister: 'Register an Account'
        }
    }

    handleToggle = (): void => {
        if (this.state.toggle === true) {
            this.setState({
                toggle: false,
                loginOrRegister: 'Go to Login'
            })
        } else {
            this.setState({
                toggle: true,
                loginOrRegister: 'Register an Account'
            })
        }
    }

    componentDidMount(): void {
        console.log('component did mount')
        if ( this.state.loginOrRegister === 'Register an Account') {
            this.setState({
                toggle: false,
                loginOrRegister: 'Go to Login'
            })
        } else {
            this.setState({
                toggle: true,
                loginOrRegister: 'Register an Account'
            })
        }
    }

    componentDidUpdate(prevProps: any, prevState: any): void {
        if (prevState.toggle === true ) {
            console.log('component updated')
        } else {
            console.log('component updated')
        }
    }

    compnentWillUnmount(): void {
        console.log('component unmounted')
    }

    render() {
        return (
        <>
            <Container className='auth-container-fluid p-5 my-5 bg-dark text-white'>
                <br />
                <Row>
                    {this.state.toggle ? <Login updateToken={this.props.updateToken}/>  : <Register updateToken={this.props.updateToken} />}
                </Row>
                <br />
                <Col>
                    <Button onClick={this.handleToggle} className='auth-button' outline color="warning">{this.state.loginOrRegister}</Button>
                </Col>
            </Container>
        </>
        )
    }
}

export default Auth;

