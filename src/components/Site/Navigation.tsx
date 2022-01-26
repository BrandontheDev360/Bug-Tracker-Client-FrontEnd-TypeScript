import React from "react";
import { Button, Navbar, Nav, NavItem, NavLink, NavbarBrand, NavbarToggler, Collapse } from "reactstrap";
import '../Site/Navigation.css'


interface NavigationProps {
    clearToken: any
}

interface NavigationState {
    isOpen: boolean
}

class Navigation extends React.Component<NavigationProps, NavigationState> {
    constructor(props: NavigationProps) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false
        }
    }

    toggle (): void {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <>
            <div>
                <Navbar color="warning" light expand="md">
                    <NavbarBrand href="/">Bug Tracker</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#allbugs">All Bugs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#replyindex">Reply</NavLink>
                        </NavItem>
                        <NavItem>
                        <Button className="logout-btn" onClick={this.props.clearToken} outline color="danger">Logout</Button>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Navbar>
            </div>
            <br />
            </>
        )
    }
}

export default Navigation