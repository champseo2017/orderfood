import React, { Component } from 'react'
import Link from 'next/link'

class Home extends Component {
 
  render() {
    return (
      <div>
         <Link href="/users">
          <a>User</a>
        </Link>
        hello
      </div>
    )
  }
}

export default Home