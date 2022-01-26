import React from 'react'
import Footer from '../Site/Footer'
import { Button } from 'reactstrap'
import {
    BrowserRouter as Router
} from 'react-router-dom';
import Navigation from '../Site/Navigation'
import BugIndex from '../Bugs/BugIndex';


interface DashboardProps {
    clearToken: any
    sessionToken: any
}

class Dashboard extends React.Component<DashboardProps> {
    render() {
        return (
            <>
                <Router>
                <Navigation clearToken={this.props.clearToken}  />
                </Router>
                <div className='container'>
                    <BugIndex sessionToken={this.props.sessionToken} />
                    {/* <ReplyIndex sessionToken={this.props.sessionToken}/> */}
                </div>
                <br />
                <br />
                <div className='container'>
                    <Button onClick={this.props.clearToken} outline color="danger">Logout</Button>
                </div>
                <Footer />
            </>
        )
    }
}

export default Dashboard