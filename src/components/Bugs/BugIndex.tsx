import React, {useEffect} from "react";
import { Button, Col, Row } from "reactstrap";
import ReplyCreate from "../Replies/ReplyCreate";
import ReplyIndex from "../Replies/ReplyIndex";
import BugCreate from "./BugCreate";
import BugDisplay from "./BugDisplay";
import BugEdit from "./BugEdit";

interface BugIndexProps {
    sessionToken: any
}

interface BugIndexState {
    bugs: any
    updateToggle: boolean
    bugUpdate: object

}

class BugIndex extends React.Component<BugIndexProps, BugIndexState> {
    constructor(props: BugIndexProps) {
        super(props)
        this.state = {
            bugs: [],
            updateToggle: false,
            bugUpdate: {}
        }
    }

    fetchBugs = (): void => {
        fetch('http://localhost:3009/bug/allbugs', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((bugData) => {
            console.log(bugData.bugs)
            this.setState({
                bugs: bugData.bugs
            })
            console.log(this.state.bugs)
        })
    }

    editUpdateBug = (bug: any) => {
        this.setState({
            bugUpdate: bug
        })
        console.log(this.state.bugUpdate)
    }

    updateOn = () => {
        this.setState({
            updateToggle: true
        })
    }

    updateOff = () => {
        this.setState({
            updateToggle: false
        })
    }

    componentDidMount() {
        if(this.state.bugs.length >= 0) {
            this.fetchBugs()
        }
    }

    render() {
        return(
            <>
            <div className="bugcreate-container">
                <Row>
                    <Col>
                        <BugCreate fetchBugs={this.fetchBugs} sessionToken={this.props.sessionToken}/>
                    </Col>
                </Row>
                
                <section id="allbugs">
                <h1>All Bugs</h1>
                <Row>
                    <Col>
                        <BugDisplay fetchBugs={this.fetchBugs} sessionToken={this.props.sessionToken} bugs={this.state.bugs} editUpdateBug={this.editUpdateBug} updateOn={this.updateOn} />
                        <Button outline color = 'warning' onClick={this.fetchBugs}>Load Bugs</Button>
                        <ReplyIndex sessionToken={this.props.sessionToken}/>
                    </Col>
                    {this.state.updateToggle ? <BugEdit bugUpdate = {this.state.bugUpdate} updateOff = {this.updateOff} 
                sessionToken = {this.props.sessionToken} fetchBugs = {this.fetchBugs} /> 
                : <></>}
                </Row>
                </section>
            </div>
            </>
        )
    }
}

export default BugIndex