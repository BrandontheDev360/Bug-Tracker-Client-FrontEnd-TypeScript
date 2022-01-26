import React from 'react';
import {Row} from 'reactstrap';
import './Footer.css'


class Footer extends React.Component {
    render() {
        return(
            <div className='container'>
            <footer>
                <br />
                <br />
                <Row>
                    <p>By Brandon Nguyen</p>
                </Row>
            </footer>
            </div>
        );
    }
}

export default Footer;