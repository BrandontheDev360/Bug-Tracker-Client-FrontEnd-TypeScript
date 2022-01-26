import React from "react";
import { Card,  CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

interface ReactDisplayProps {
    sessionToken: any
    fetchReplies: any
    editUpdateReply: any
    updateOn: any
    replies: any
}


class ReplyDisplay extends React.Component<ReactDisplayProps> {
    deleteReply = (reply: any) => {
        fetch(`http://localhost:3009/reply/${reply.id}`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        }).then(() => this.props.fetchReplies())
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

    replyMapper = () => {
        return this.props.replies.map((reply: any, index: any) => {
            return(
                <>
                <Card key={index}>
                    <CardBody>
                        <h2>Reply</h2>
                        <CardText>Bug Id Claimed: {reply.bugId}</CardText>
                        <CardText>{reply.reply}</CardText>
                        <CardText>{}</CardText>
                        <Button outline color = 'primary' onClick = {() => {this.props.editUpdateReply(reply); this.props.updateOn()}}>Update Reply</Button>
                        <Button className="delete-btn" outline color = 'danger' onClick={() => {this.deleteReply(reply)}}>Delete</Button>
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
            {this.replyMapper()}
            </>
        )
    }
}

export default ReplyDisplay;