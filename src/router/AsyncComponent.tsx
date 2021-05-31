import React from 'react'
export const AsyncComponent = (loadComponent: any) =>
  class AsyncComponent extends React.Component {
    state = {
      Component: null,
    }

    UNSAFE_componentWillMount() {
      if (this.hasLoadedComponent()) {
        return
      }

      loadComponent()
        .then((module: { default: any }) => module.default)
        .then((Component: any) => {
          this.setState({ Component })
        })
        .catch((err: any) => {
          console.error(`Cannot load component in <AsyncComponent />`)
          throw err
        })
    }

    hasLoadedComponent() {
      return this.state.Component !== null
    }

    render() {
      const { Component } = this.state as any
      return Component ? <Component {...this.props} /> : null
    }
  }
