import React, { Component } from 'react';

import Loader from './core/loader.jsx';
import '../../styles/app.scss';
import SavedPasswords from './savedPasswords.jsx';

class App extends Component {
    constructor() {
        super();

        this.state = {
            loading: false
        };
    }

    render() {
        const { loading } = this.state;

        return !loading ? (
                <div className="app-wrapper">
                    <h2>Saved passwords</h2>
                    <SavedPasswords/>
                </div>
        ) : <Loader />;
    }
}

export default App;
