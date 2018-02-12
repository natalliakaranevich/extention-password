import React, { Component } from 'react';

import { getChromeStorageData } from '../helpers';

import Loader from './core/loader.jsx';

import '../../styles/app.scss';

class App extends Component {
    constructor() {
        super();

        this.state = {
            loading: true
        };

        getChromeStorageData().then(data => {
            this.setState({
                data: data,
                // loading: false
            });
        });
    }

    render() {
        const { loading } = this.state;

        return !loading ? (
                <div>App</div>
        ) : <Loader />;
    }
}

export default App;
