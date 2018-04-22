import React, { Component } from 'react';

export default (importPromise) => class extends Component {

    state = {
        component: null
    }

    async componentDidMount() {
        const cmp = await importPromise;
        this.setState({
            component: cmp.default
        });
    }

    render() {
        const { Component } = this.state;
        return Component ? <Component {...this.props} /> : null;
    }
}