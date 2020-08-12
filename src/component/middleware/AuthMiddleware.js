import React, { Component } from 'react'

export const WithAuth = WrappedComponent =>
  class extends Component {
    static getInitialProps = async ctx => {
      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))
      return { ...componentProps }
    }
    constructor(props) {
      super(props)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }