import React, { Component } from 'react'
import nextExpressPage from "next-express/page";
import Create from '../../../component/shopstore/Create'

class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <Create/>
            </React.Fragment>
        )
    }
}

export default nextExpressPage(Index)