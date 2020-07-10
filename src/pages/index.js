import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import nextExpressPage from "next-express/page";

class Home extends Component {
  constructor() {
    super()

    this.state = {
      input: '',
      message: [],
      endpoint: "https://orderfoodtestv1.herokuapp.com"
      /* 
      https://orderfoodtestv1.herokuapp.com
      http://localhost:8080
      เชื่อมต่อไปยัง url ของ realtime server
      */
     
    }
  }

  componentDidMount = () => {
    this.response()
  }

  // เมื่อมีการส่งข้อมูลไปยัง server
  send = (message) => {
    const { endpoint, input } = this.state
    const socket = socketIOClient(endpoint)
    socket.emit('sent-message', input)
    this.setState({ input: '' })
  }

  // รอรับข้อมูลเมื่อ server มีการ update
  response = () => {
    const { endpoint, message } = this.state
    const temp = message
    const socket = socketIOClient(endpoint)
    socket.on('new-message', (messageNew) => {
      temp.push(messageNew)
      this.setState({ message: temp })
    })
  }

  changeInput = (e) => {
    this.setState({ input: e.target.value })
  }

  render() {
    const { input, message } = this.state
  
    return (
      <div>
        <div style={style}>
          <input value={input} onChange={this.changeInput} />
          <button onClick={() => this.send()}>Send</button>
        </div>
        {
          message.map((data, i) =>
            <div key={i} style={style} >
              {i + 1} : {data}
            </div>
          )
        }
      </div>
    )
  }
}

const style = { marginTop: 20, paddingLeft: 50 }


Home.getInitialProps = async (ctx) => {
  const {statusCode} = ctx.query._nextExpressData
  console.log(statusCode);
  
  
   return {page:''}
}

export default nextExpressPage(Home)