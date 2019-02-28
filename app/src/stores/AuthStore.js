import React from 'react';
import PropTypes from 'prop-types';

import BaseStore from './BaseStore';

const AuthContext = React.createContext(null);

export class AuthStore extends BaseStore {

    static propTypes = {
        children: PropTypes.node.isRequired,
    }

    state = {
        loggedOn: false,
        setLoggedOn: this.setLoggedOn,
    }

    render() {
        return <AuthContext.Provider value={this.state}>
            {this.props.children}
        </AuthContext.Provider>
    }

    setLoggedOn = () => {
        this.setState({
            loggedOn: true,
        });
    }
}

export const AuthConsumer = AuthContext.Consumer;
