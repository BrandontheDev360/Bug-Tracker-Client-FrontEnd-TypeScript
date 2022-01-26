import React from "react";
import { Button, Col, Row } from "reactstrap";
import ReplyCreate from "./ReplyCreate";
import ReplyDisplay from "./ReplyDisplay";
import ReplyEdit from "./ReplyEdit";

interface ReplyIndexProps {
    sessionToken: any
}

interface ReplyIndexState {
    replies: any
    updateToggle: boolean
    replyUpdate: object
}

class ReplyIndex extends React.Component<ReplyIndexProps, ReplyIndexState> {
    constructor(props: ReplyIndexProps) {
        super(props)
        this.state = {
            replies: [],
            updateToggle: false,
            replyUpdate: {}
        }
    }

    fetchReplies = (): void => {
        fetch('http://localhost:3009/reply/all', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((replyData) => {
            console.log(replyData.replies)
            this.setState({
                replies: replyData.replies
            })
            console.log(this.state.replies)
        })
    }

    editUpdateReply = (reply: any) => {
        this.setState({
            replyUpdate: reply
        })
        console.log(this.state.replyUpdate)
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
        if(this.state.replies.length >= 0) {
            this.fetchReplies()
        }
    }

    render() {
        return(
            <>
            <div className="container">
                <Row>
                    <Col>
                        <ReplyCreate fetchReplies={this.fetchReplies} sessionToken={this.props.sessionToken} replyUpdate = {this.state.replyUpdate}/>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <ReplyDisplay fetchReplies={this.fetchReplies} sessionToken={this.props.sessionToken}  editUpdateReply={this.editUpdateReply} updateOn={this.updateOn} replies={this.state.replies}/>
                    </Col>
                    {this.state.updateToggle ? <ReplyEdit replyUpdate = {this.state.replyUpdate} updateOff = {this.updateOff} 
                sessionToken = {this.props.sessionToken} fetchReplies = {this.fetchReplies} /> 
                : <></>}
                </Row>
            </div>
            </>
        )
    }
}

export default ReplyIndex;