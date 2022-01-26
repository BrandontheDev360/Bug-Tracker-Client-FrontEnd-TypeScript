import React from "react";
import { Card,  CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import ReplyIndex from "../Replies/ReplyIndex";

interface BugDisplayProps {
    sessionToken: any
    fetchBugs: any
    bugs: any
    editUpdateBug: any
    updateOn: any
}

interface BugDisplayState {
    user: any
}

class BugDisplay extends React.Component<BugDisplayProps, BugDisplayState> {
    constructor(props: BugDisplayProps) {
        super(props)
        this.state = {
            user: []
        }
    }

    deleteBug = (bug: any) => {
        fetch(`http://localhost:3009/bug/${bug.id}`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        }).then(() => this.props.fetchBugs())
    }

    fetchUsers = () => {
        fetch('http://localhost:3009/user/info', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .then((res) => res.json())
        .then((userData) => {
            console.log(userData.users)
        })
    }

    bugMapper = () => {
        return this.props.bugs.map((bug: any, index: any) => {
            return(
                <>
                <Card key={index}>
                    <CardBody>
                        <h2>Bug Ticket</h2>
                        <CardTitle>Title: {bug.title}</CardTitle>
                        <CardSubtitle>Priority: {bug.priority}</CardSubtitle>
                        <CardText>Description: {bug.description}</CardText>
                        <CardText>Bug Id: {bug.id}</CardText>
                        <Button outline color = 'primary' onClick = {() => {this.props.editUpdateBug(bug); this.props.updateOn()}}>Update Bug Ticket</Button>
                        <Button className="delete-btn" outline color = 'danger' onClick={() => {this.deleteBug(bug)}}>Delete</Button>
                        <ReplyIndex sessionToken={this.props.sessionToken}/>
                    </CardBody>
                </Card>
                <br />
                </>
            )
        })
    }

    render() {
        return(
            <>
            {this.bugMapper()}
            </>
        )
    }
}

export default BugDisplay