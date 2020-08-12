import React, { Component } from "react";
import dynamic from "next/dynamic";
const Loading = dynamic(() => import("../loading/Loading"), { ssr: false });

export const LoadingPages = (WrappedComponent) =>
  class extends Component {
    _isMounted = false;
    static getInitialProps = async (ctx) => {
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));
      return { ...componentProps };
    };
    constructor(props) {
      super(props);
      this.state = { loading: true };
    }

    componentDidMount() {
      this._isMounted = true;
      if (this._isMounted) {
        setTimeout(() => {
          const loadStyle = {
            loading: false,
          };
          this.setState({
            ...loadStyle,
          });
        }, 900);
      }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      const { loading } = this.state;
      return (
        <React.Fragment>
          {loading ? (
            <Loading loading={loading} />
          ) : (
            <WrappedComponent {...this.props} />
          )}
        </React.Fragment>
      );
    }
  };
